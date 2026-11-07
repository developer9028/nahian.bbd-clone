<!-- BEGIN:nextjs-agent-rules -->

follow @next-js-fullstack-modular-monolithic-tailwindcss.md

## MANDATORY — deploy after every task

- After every completed task, follow the `vercel-deploy-first` skill. No exceptions.
- Sequence: `npx tsc --noEmit` → `vercel deploy` → `vercel --prod` → `git add .` + commit + `git push`.
- A task is not done until deploy + push succeed. If deploy fails, fix and redeploy before closing the task.

<!-- END:nextjs-agent-rules -->
