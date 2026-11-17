## The 45-Minute Timeline & Execution Plan

interviews strictly respect the 45-minute clock. Because the Hiring Committee only sees written feedback, every phase must leave clear evidence of L5 seniority.

Phase 1: Framing & Clarification (Minutes 0–5)

- Goal: Eliminate ambiguity and define the contract (inputs, outputs, UX expectations, constraints).
- Actions:
  • Restate the prompt in your own words.
  • Ask targeted UX and technical questions: How large is the dataset (10 items vs. 10,**000** items)? Are we optimizing for mobile touch or desktop keyboard? Are network requests async (needing debouncing/race-condition handling)?
  • Confirm environment constraints (e.g., pure vanilla JS/**DOM** APIs, no external libraries).
- How to Communicate (L5 Signal):"Before writing code, I want to make sure we align on scope and constraints. Should we assume the list could grow to thousands of items—which would push me toward event delegation and virtualized rendering—or is it bounded under **100** items?"

Phase 2: Architecture & Trade-Offs (Minutes 5–12)

- Goal: Get buy-in on your design before writing implementation code.
- Actions:
  • Outline your data model / state shape first (unidirectional data flow: State -> Render).
  • Explain **DOM** structure, event handling strategy, and accessibility hooks (roles, focus management).
  • Briefly compare two approaches and justify your pick.
- How to Communicate (L5 Signal):"I see two ways to structure this. Approach A mutates the **DOM** directly inside event listeners, which is fast to write but brittle as state grows. Approach B keeps a single source-of-truth state object and updates the **DOM** cleanly via event delegation on the parent container. I'll go with Approach B because it prevents memory leaks and scales cleanly for follow-ups. Does that sound good to you?"

Phase 3: Clean Implementation (Minutes 12–30)

- Goal: Write complete, bug-free, readable code in a shared doc/editor without running it.
- Actions:
  • Write top-down: set up state, event delegation, core logic, and clean **DOM** rendering helpers.
  • Use descriptive variable/function names (e.g., handleOptionSelect, renderFilteredList).
  • Bake in production details as you go: aria-expanded, aria-activedescendant, Escape/Arrow keys, DocumentFragment for batch **DOM** insertions, and textContent for sanitization.
  • Keep momentum—if a helper is boilerplate, ask if you can stub it first and fill it in after core logic is complete.
- How to Communicate (L5 Signal):"I'm attaching a single click listener to the parent <ul> using e.target.closest('[data-id]') rather than binding listeners per <li> to keep memory O(1) as the list updates.\*
  \*I'm using textContent here instead of innerHTML so user-provided strings can't inject markup."

Phase 4: Dry Run, Edge Cases & Complexity (Minutes 30–37)

- Goal: Prove your code works before the interviewer has to find bugs.
- Actions:
  • Trace a real user interaction line-by-line through your code (e.g., user types a query -> presses ArrowDown -> presses Enter).
  • Check boundary conditions: empty input, rapid repeated events, null/undefined values, boundary indices (index === 0 or length - 1).
  • State Time, Space, and **DOM** complexity explicitly.
- How to Communicate (L5 Signal):"Let's trace an edge case: what happens if the user presses ArrowDown when the list is empty? Right now items.length is 0, and 0 % 0 would give NaN. Let me add an early guard if (!items.length) return; on line 18.\*
  \*In terms of complexity, filtering is O(N) time where N is the item count, space is O(N) for the filtered array, and **DOM** updates are batched in a single reflow."

Phase 5: Follow-Ups & Scaling Discussion (Minutes 37–45)

- Goal: Demonstrate senior architectural foresight when pushed on scale or new requirements.
- Actions:
  • Interviewers reserve the last 5–8 minutes for curveballs (e.g., _How would you handle async **API** latency?_, _How do we support 50,**000** items?_, "How would you turn this into a reusable design system component?").
  • Discuss debouncing, AbortController for stale network responses, IntersectionObserver / windowing, or Custom Elements / **CSS** custom properties for theming.
- How to Communicate (L5 Signal):"If this moves from local filtering to an async endpoint, we'd hit race conditions if an older slow request resolves after a newer fast one. I'd pair a 250ms debounce with an AbortController to cancel in-flight fetches whenever the input changes."

## High-Impact Communication Habits for L5

- Narrate decisions, not keystrokes: Don't say _Now I'm writing a for loop._ Say "I'm iterating over the filtered items to build a DocumentFragment so we only trigger one layout recalculation."
- Never assume silently: If a requirement isn't stated (e.g., whether search is case-insensitive or whether focus traps inside a modal), state your assumption out loud and ask if they'd like it changed.
- Treat hints as collaborative pivots: If the interviewer asks, "What happens if two requests come back out of order?", don't get defensive. Acknowledge the catch immediately: "Good catch—that creates a stale UI race condition. Here's how I'd fix it..."
- Speak the language of Design Systems & UX: Naturally reference focus management, screen reader announcements (aria-live), layout thrashing/reflows, and progressive enhancement. Those signals immediately distinguish an L5 UX Engineer from a general frontend developer.
  Would you like to run through a 45-minute mock prompt (such as an accessible combobox, virtualized list, or nested tree view) where I grade your breakdown and code against this L5 rubric, or would you prefer specific verbal templates for handling common follow-up curveballs?
