// Rich content for each blog post keyed by slug
// Content is represented as an ordered array of blocks: { type: 'h2'|'p'|'ul'|'li'|'note', text: string }

export const blogContentBySlug = {
  'how-to-prepare-your-home-for-a-professional-cleaning': [
    {
      type: 'p',
      text: 'A few quick preparations before your cleaners arrive can dramatically improve results and save you time and money.',
    },
    { type: 'h2', text: '48–24 Hours Before' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Confirm access instructions (codes, parking, pets).' },
    { type: 'li', text: 'Tidy surfaces so pros can focus on cleaning, not organizing.' },
    { type: 'li', text: 'Run the dishwasher and laundry if possible to clear sinks and hampers.' },
    { type: 'h2', text: 'Day Of Your Cleaning' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Put away valuables and personal paperwork.' },
    { type: 'li', text: 'Clear counters and floors for better access to edges and corners.' },
    { type: 'li', text: 'Secure pets or note special instructions.' },
    { type: 'h2', text: 'What We Bring vs. What You Provide' },
    {
      type: 'p',
      text: 'We bring professional supplies and equipment. If you prefer we use certain products (e.g., stone-safe cleaners), leave them on the counter with a note.',
    },
    { type: 'h2', text: 'After The Clean' },
    {
      type: 'p',
      text: 'Walk through the home within 24 hours. If anything was missed, let us know and we will make it right.',
    },
  ],

  'recurring-vs-one-time-cleaning-which-is-right-for-you': [
    {
      type: 'p',
      text: 'Choosing between a recurring plan and a one-time deep clean depends on your lifestyle, budget, and expectations.',
    },
    { type: 'h2', text: 'Recurring Cleaning' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Best for busy households that want consistent upkeep.' },
    { type: 'li', text: 'Lower cost per visit after initial deep clean.' },
    { type: 'li', text: 'Predictable schedule (weekly, bi-weekly, or every 4 weeks).' },
    { type: 'h2', text: 'One-Time Deep Clean' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Ideal for move-ins/outs, pre-listing, or seasonal reset.' },
    { type: 'li', text: 'Higher effort visit targeting built-up grime.' },
    { type: 'li', text: 'Flexible timing—book when you need it.' },
    { type: 'h2', text: 'How to Decide' },
    {
      type: 'p',
      text: 'If you spend more than 1–2 hours each week catching up on cleaning, a recurring plan usually pays for itself in time saved and consistency.',
    },
  ],

  'the-ultimate-post-renovation-cleaning-checklist': [
    {
      type: 'p',
      text: 'Renovations leave fine dust that settles for days. Use this order of operations for best results.',
    },
    { type: 'h2', text: 'Step-by-Step' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Start high: ceilings, vents, light fixtures.' },
    { type: 'li', text: 'Walls, trim, doors, and baseboards with frequent microfiber rinses.' },
    { type: 'li', text: 'Cabinets inside/out, shelves, and closets.' },
    { type: 'li', text: 'Windows, tracks, and frames.' },
    { type: 'li', text: 'Finish with floors (vacuum crevices, then damp mop).' },
    { type: 'h2', text: 'Safety Notes' },
    {
      type: 'p',
      text: 'Wear masks during heavy dusting. Protect delicate finishes; avoid abrasive pads on new surfaces.',
    },
  ],

  'how-to-keep-your-bathroom-sparkling-between-cleans': [
    {
      type: 'p',
      text: 'A 5-minute routine prevents mildew and soap scum so your deep cleans last longer.',
    },
    { type: 'h2', text: 'Daily 5-Minute Routine' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Squeegee shower glass and tiles.' },
    { type: 'li', text: 'Wipe faucet and sink to prevent water spots.' },
    { type: 'li', text: 'Quick wipe of toilet seat and handle.' },
    { type: 'h2', text: 'Weekly Touch-Ups' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Treat grout trouble spots and polish mirrors.' },
    { type: 'li', text: 'Swap towels; launder bath mats.' },
  ],

  'a-guide-to-eco-friendly-cleaning-products': [
    {
      type: 'p',
      text: '“Green” labels vary widely. Here is how to choose products that actually work and are safer for your home.',
    },
    { type: 'h2', text: 'What to Look For' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Clear ingredient lists and third-party certifications.' },
    { type: 'li', text: 'pH-appropriate products for stone, wood, and delicate surfaces.' },
    { type: 'li', text: 'Concentrates to reduce plastic waste.' },
    { type: 'h2', text: 'What to Avoid' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Undisclosed “fragrance” blends if you have sensitivities.' },
    { type: 'li', text: 'Abrasives on coated or soft surfaces.' },
  ],

  'moving-cleaning-checklist-move-in-move-out': [
    {
      type: 'p',
      text: 'Whether you are handing back keys or moving into a new space, this checklist keeps you organized.',
    },
    { type: 'h2', text: 'Kitchen' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Inside/out of cabinets and drawers.' },
    {
      type: 'li',
      text: 'Appliances: oven, fridge (including behind and underneath if accessible).',
    },
    { type: 'li', text: 'Counters, backsplash, sink, and fixtures.' },
    { type: 'h2', text: 'Bathrooms' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Tub/shower descaling, grout attention, mirrors, and fixtures.' },
    { type: 'h2', text: 'Whole Home' },
    { type: 'ul', text: '' },
    { type: 'li', text: 'Baseboards, doors, closets, and window tracks.' },
    { type: 'li', text: 'Final floor detail: vacuum edges, mop last.' },
  ],
};