/**
 * Animation direction for view transitions
 */
export type AnimationDirection = 'left' | 'right' | '';

/**
 * Route pattern definitions for the application
 */
export const ROUTES = {
  GROUPS: '/groups',
  NEW_GROUP: '/groups/new',
  GROUP_ENTRIES: (id?: string) => (id ? `/groups/${id}` : '/groups/'),
} as const;

/**
 * Checks if a URL matches the group entries pattern
 */
function isGroupEntriesRoute(url: string): boolean {
  return url.startsWith('/groups/') && url !== '/groups' && url !== '/groups/new';
}

/**
 * Determines the animation direction based on navigation from one route to another.
 *
 * Animation logic:
 * - LEFT direction: Used for add-group page transitions
 *   - Going TO /groups/new → slides in from left
 *   - Coming FROM /groups/new → slides out to left
 *
 * - RIGHT direction: Used for entries page transitions
 *   - Going TO /groups/:id → slides in from right
 *   - Coming FROM /groups/:id → slides out to right
 *
 * The CSS handles the reverse animations automatically using
 * ::view-transition-old() and ::view-transition-new() pseudo-elements.
 *
 * @param fromUrl - The URL we're navigating from
 * @param toUrl - The URL we're navigating to
 * @returns The animation direction ('left', 'right', or empty string for no animation)
 */
export function getAnimationDirection(fromUrl: string, toUrl: string): AnimationDirection {
  // Normalize URLs
  const normalizedTo = toUrl === '/' ? ROUTES.GROUPS : toUrl;
  const normalizedFrom = fromUrl === '/' ? ROUTES.GROUPS : fromUrl;

  // Going to add-group page
  if (normalizedTo === ROUTES.NEW_GROUP) {
    return 'left';
  }

  // Going to a specific group (entries page)
  if (isGroupEntriesRoute(normalizedTo)) {
    return 'right';
  }

  // Going back to groups page - determine direction based on source
  if (normalizedTo === ROUTES.GROUPS) {
    if (normalizedFrom === ROUTES.NEW_GROUP) {
      return 'left';
    }
    if (isGroupEntriesRoute(normalizedFrom)) {
      return 'right';
    }
  }

  // No animation
  return '';
}
