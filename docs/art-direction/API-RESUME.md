# API fallback preparation

The built-in image quota remains exhausted until 2026-11-06 15:36:44 America/Chicago. On the owner's next request to continue, the reset time was checked; it had not arrived. No additional image generation was attempted, and no API call was made.

An ignored local file, `.env.imagegen.local`, is prepared for the owner to enter `OPENAI_API_KEY` privately. It is an authoring-only credential and must never be included in the app, deployment payload, logs or chat. Do not overwrite an existing credential. The key is currently unset in the process environment.

The owner must specify an API spending budget before billed image generation starts. Continue using the built-in tool after reset unless the owner confirms the paid API route. Do not interpret an unspecified "continue" as permission for unbounded API spending.

Use the bundled imagegen skill CLI for an explicitly confirmed API workflow; do not modify that CLI or create a custom SDK runner. Check current official model documentation and the installed CLI's actual parameter support before selecting a model. A model change requires the owner's confirmation. Current official documentation supports transparent output for GPT Image 2.5, whereas the installed skill's older CLI guidance rejects transparency for its default GPT Image 2 path. Do not silently downgrade to GPT Image 1.5.

The existing 148 reviewed course pictures, 20 cast portraits and default learner portrait remain intact. The exact 340 pending jobs are in `lithuanian-art-pending.json`; generate only unfinished jobs. Validate any API sample against the approved style reference before continuing a batch.
