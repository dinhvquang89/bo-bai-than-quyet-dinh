# AGENT DIRECTORY

- **Agent 0**: Commander Agent. Responsible for high-level strategy and coordinating all other agents.
- **Agent 4**: Software Architect. Responsible for core features, DB structure, and monetization logic.
- **Agent 5**: Data Analyst & Monitoring. Responsible for evaluating A/B testing results and updating `ANALYTICS_REPORT.md`.

# FILE AUDIT TRACKING RULE (CRITICAL)
// @AGENT_MODIFIED: 2026-04-20T22:45:00Z | Agent 4 | Reason: Onboarded Agent 5 for A/B Testing | Tag: #process
Whenever you (any AI Agent) modify ANY file in this repository, you MUST leave an inline note (comment) at either the top or bottom of the modified file.
Format: `// @AGENT_MODIFIED: [Timestamp] | [Agent_Name] | Reason: [Action_Description] | Tag: [tags]`
Example: `// @AGENT_MODIFIED: 2026-04-20T10:00:00Z | Agent 4 | Reason: Updated schema | Tag: #db`
If the file language uses different comment syntax (e.g., HTML `<!-- -->`), adjust the syntax accordingly.
If an external audit system scans a modified file and sees NO such comment matching the edit time, it will automatically assume the USER manually modified it.
