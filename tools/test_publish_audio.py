import importlib.util
import unittest
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError
from pathlib import Path

spec = importlib.util.spec_from_file_location('publish_audio', Path(__file__).resolve().with_name('publish_audio.py'))
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)

def response(status, data=b'audio'):
    value = MagicMock()
    value.__enter__.return_value = value
    value.status = status
    value.read.return_value = data
    return value

class AudioProbeTests(unittest.TestCase):
    def test_head_success(self):
        with patch.object(audio.urllib.request, 'urlopen', return_value=response(200)) as open_url:
            self.assertTrue(audio.served('https://example.com/a.mp3'))
            self.assertEqual(open_url.call_count, 1)

    def test_head_failure_but_playable_range(self):
        with patch.object(audio.time, 'sleep'), patch.object(audio.urllib.request, 'urlopen', side_effect=[TimeoutError()] * 3 + [response(206)]) as open_url:
            self.assertTrue(audio.served('https://example.com/a.mp3'))
            request = open_url.call_args.args[0]
            self.assertEqual(request.get_method(), 'GET')
            self.assertEqual(request.get_header('Range'), 'bytes=0-31')

    def test_missing_stays_failure(self):
        error = HTTPError('https://example.com/a.mp3', 404, 'Not found', {}, None)
        with patch.object(audio.time, 'sleep'), patch.object(audio.urllib.request, 'urlopen', side_effect=error):
            self.assertFalse(audio.served('https://example.com/a.mp3'))

    def test_empty_response_stays_failure(self):
        with patch.object(audio.time, 'sleep'), patch.object(audio.urllib.request, 'urlopen', side_effect=[TimeoutError()] * 3 + [response(206, b'')]):
            self.assertFalse(audio.served('https://example.com/a.mp3'))

    def test_recheck_only_failures(self):
        urls = [audio.SITE + 'host/a.mp3', audio.SITE + 'host/b.mp3']
        with patch.object(audio.time, 'sleep'), patch.object(audio, 'served', side_effect=[True, False, True]) as probe:
            self.assertTrue(audio.check({'host': ['a.mp3', 'b.mp3']}))
            self.assertEqual([c.args[0] for c in probe.call_args_list], urls + [urls[1]])

    def test_recheck_cannot_hide_missing(self):
        with patch.object(audio.time, 'sleep'), patch.object(audio, 'served', return_value=False):
            self.assertFalse(audio.check({'host': ['missing.mp3']}))

if __name__ == '__main__':
    unittest.main()

