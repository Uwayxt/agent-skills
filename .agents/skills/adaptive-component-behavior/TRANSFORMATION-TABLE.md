# Adaptive Component Transformations

Use this table as the canonical reference for how components adapt across devices.

| Component | Desktop | Tablet | Mobile |
|---|---|---|---|
| Sidebar nav | Always open | Collapsible (icon-only, expand on tap) | Bottom navigation bar or hamburger + drawer |
| Data table (many columns) | Full table | Horizontal scroll / priority columns | Card list (each row becomes a summary card) |
| Dropdown menu | Click, appears at cursor | Same, larger tap target | Bottom sheet (slides up from bottom) |
| Large modal | Centered overlay | Medium centered modal | Fullscreen modal / separate page |
| Hover tooltip/actions | On hover | Tap-and-hold | Permanently visible or swipe-to-reveal |
| Multi-column form | Multiple columns | 2 or 1 column by width | Always 1 column, large inputs |
| Tabs (many tabs) | Horizontal tab bar | Scrollable tab bar | Dropdown selector or bottom-sheet picker |
| Tooltip | On hover | Tap to reveal | Eliminated / content shown inline |

## Implementation Notes

- **Transform Required vs. Responsive Resize**: Use transformations when simply resizing a component degrades the user experience. For instance, resizing a data table on mobile inevitably leads to truncation or horizontal scrolling; transform it to a card list instead.
- **Touch Targets**: When components transform to their tablet or mobile variants, ensure all interactive elements satisfy the minimum 44x44pt target area.
- **Hover States**: Hover interactions do not exist on mobile. Transform any pattern that relies on hover into a tap, long-press, or persistently visible UI element.
