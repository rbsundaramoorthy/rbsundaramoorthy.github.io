# Tally Popup Integration Instructions

## Task
Add a Tally popup form to the Astro personal site at `rbsundaramoorthy.github.io`. The popup opens when a visitor clicks a "Share your answer" button on the Perspectives page.

## Step 1: Add the Tally embed script

In `src/layouts/BaseLayout.astro`, add this script tag inside the `<head>` section:

```html
<script async src="https://tally.so/widgets/embed.js"></script>
```

If `BaseLayout.astro` doesn't exist yet, create it with a standard HTML structure including this script, and make sure all pages use this layout.

## Step 2: Update the Perspectives page

In `src/pages/perspectives.astro`, find the placeholder area for the monthly question form embed (it may say `[ Tally / Typeform embed goes here ]` or similar).

Replace it with this button:

```html
<button
  data-tally-open="OD0X0g"
  data-tally-emoji-text="👋"
  data-tally-emoji-animation="wave"
  style="
    padding: 14px 32px;
    background: #C0754A;
    color: #FAF7F2;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  "
>
  Share your answer
</button>
```

Do the same for any other poll embed placeholder on the Perspectives page — add a similar button with the appropriate Tally form ID.

## Step 3: If using React components

If the Perspectives page uses a React component (`.jsx`), use this instead:

```jsx
<button
  data-tally-open="OD0X0g"
  data-tally-emoji-text="👋"
  data-tally-emoji-animation="wave"
  style={{
    padding: "14px 32px",
    background: "#C0754A",
    color: "#FAF7F2",
    border: "none",
    borderRadius: "8px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
>
  Share your answer
</button>
```

## Design reference

- Button background: `#C0754A` (terracotta accent)
- Button text color: `#FAF7F2` (warm parchment)
- Font: DM Sans
- Border radius: 8px
- These match the site's existing design tokens

## How it works

When a visitor clicks the button, Tally's embed script detects the `data-tally-open` attribute and opens the form as a popup overlay. No iframe needed. The form ID is `OD0X0g`.
