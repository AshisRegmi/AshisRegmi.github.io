// src/data.js
// Offline first-aid content for the US/Canada ("Emergency Quick Reference").
// Emergency number: 911.
//
// NOTE: This content is a quick-reference aid only. It does not replace
// certified first-aid training or professional medical care. When in doubt,
// call 911 (or your local emergency number) immediately.

export const emergencyNumber = '911';
export const region = 'US/Canada';

// Severity levels:
//   'critical' -> life-threatening; dial 911 now
//   'serious'  -> needs prompt medical attention (may need 911)
//   'minor'    -> can usually be managed with self-care
export const SEVERITY_LEVELS = ['critical', 'serious', 'minor'];

/**
 * Each topic:
 *   id        unique slug (kebab-case), used as a stable URL/hash key
 *   title     human-readable name
 *   category  grouping used by filters / navigation
 *   severity  one of SEVERITY_LEVELS
 *   call911   true if you should dial 911 immediately for this situation
 *   summary   one-line description shown in lists
 *   keywords  extra search terms (synonyms, related words)
 *   steps     ordered action list (what to DO)
 */
export const topics = [
  {
    id: 'cpr-adult',
        illustration: 'cpr-adult',
        animation: 'cpr-anatomy',
    title: 'CPR — Adult',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'Chest compressions and rescue breaths for an unresponsive adult who is not breathing normally.',
    keywords: ['cardiopulmonary resuscitation', 'heart stopped', 'no pulse', 'resuscitation', 'compressions'],
    steps: [
      'Check responsiveness and breathing. If the person is unresponsive and not breathing or only gasping, call 911 (or ask someone to) and get an AED if available.',
            'If you are untrained or unsure about rescue breaths, do hands-only CPR: continuous chest compressions, no breaths.',
            'Place the heel of one hand on the center of the chest, other hand on top, arms straight.',
      'Push hard and fast: at least 2 inches deep, 100–120 compressions per minute.',
      'After 30 compressions, give 2 rescue breaths (head tilt-chin lift, pinch nose, blow until chest rises).',
      'Continue cycles of 30 compressions / 2 breaths until an AED arrives, the person revives, or EMS takes over.',
    ],
  },
  {
    id: 'cpr-child',
    illustration: 'cpr-child',
    title: 'CPR — Child (1–puberty)',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'CPR technique adapted for an unresponsive child who is not breathing normally.',
    keywords: ['pediatric cpr', 'kid', 'resuscitation', 'compressions', 'infant older'],
    steps: [
      'Call 911 and get an AED. If alone with no phone, give about 2 minutes of CPR before leaving to call, unless the collapse was sudden and witnessed — then call 911 first.',
      'Use one or two hands to compress the lower half of the breastbone about 2 inches deep, 100–120 per minute.',
      'Give 30 compressions then 2 gentle rescue breaths.',
      'Use an AED as soon as one is available, following its prompts.',
      'Continue until the child responds, an AED/EMS takes over, or you are exhausted.',
    ],
  },
  {
    id: 'cpr-infant',
    illustration: 'cpr-infant',
    title: 'CPR — Infant (under 1)',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'CPR for a baby who is unresponsive and not breathing normally.',
    keywords: ['baby cpr', 'infant resuscitation', 'two fingers', 'newborn', 'rescue breaths'],
    steps: [
      'Check responsiveness and breathing. If unresponsive and not breathing normally, call 911 (or have someone call) and get an AED. If alone with no phone, give about 2 minutes of CPR before leaving to call.',
      'Compress the lower half of the breastbone, just below the nipple line, using two fingers about 1.5 inches (4 cm) deep, 100–120 per minute.',
      'After every 30 compressions, give 2 gentle rescue breaths, covering both the mouth and nose with your mouth.',
      'Use an AED with pediatric pads if available, or adult pads if that is all you have, following its prompts.',
      'Continue until the baby responds, an AED or EMS takes over, or you are exhausted.',
    ],
  },
  {
    id: 'choking-adult',
    illustration: 'heimlich-adult',
    title: 'Choking — Conscious Adult/Child',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'Relieve a blocked airway in someone who is awake and cannot speak, cough, or breathe.',
    keywords: ['heimlich', 'airway blocked', 'can’t breathe', 'abdominal thrusts', 'foreign object'],
    steps: [
      'Ask "Are you choking?" If they can cough forcefully, encourage coughing — do not interfere.',
      'If they cannot cough, speak, or breathe, call 911 immediately.',
      'Stand behind them, lean them forward, and give 5 sharp back blows between the shoulder blades.',
      'If back blows fail, give 5 abdominal thrusts (Heimlich): fist above navel, quick inward-up pulls.',
      'Alternate 5 back blows and 5 thrusts until the object clears or the person becomes unresponsive (then start CPR).',
    ],
  },
  {
    id: 'choking-infant',
    illustration: 'choking-infant',
    title: 'Choking — Infant (under 1)',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'Clear a blocked airway in a baby who cannot cry, cough, or breathe.',
    keywords: ['baby choking', 'back blows', 'chest thrusts', 'foreign object', 'newborn'],
    steps: [
      'Call 911 (or have someone do it) if alone after attempting for 1 minute.',
      'Hold the infant face-down along your forearm, head lower than chest; give 5 firm back slaps between the shoulder blades.',
      'Turn face-up and give 5 chest thrusts with two fingers on the breastbone, about 1.5 inches deep.',
      'Repeat back slaps and chest thrusts until the object clears or the infant becomes unresponsive (then begin infant CPR).',
      'Never use abdominal thrusts (Heimlich) on an infant.',
    ],
  },
  {
    id: 'severe-bleeding',
    illustration: 'bleeding-pressure',
    title: 'Severe Bleeding',
    category: 'Trauma & Wounds',
    severity: 'critical',
    call911: true,
    summary: 'Control heavy blood loss from a wound as quickly as possible.',
    keywords: ['hemorrhage', 'cut', 'gash', 'blood loss', 'wound', 'tourniquet'],
    steps: [
      'Call 911 for severe, pulsing, or uncontrolled bleeding.',
      'Apply firm, direct pressure to the wound with a clean cloth or bandage.',
      'If blood soaks through, add more layers — do NOT remove the first.',
      'If bleeding does not stop and is on an arm or leg, apply a tourniquet 2–3 inches above the wound.',
      'Keep the person lying down and warm; treat for shock if signs appear.',
    ],
  },
  {
    id: 'burns',
    illustration: 'burns',
    title: 'Burns',
    category: 'Trauma & Wounds',
    severity: 'serious',
    call911: true,
    summary: 'Cool and protect a burn; get help for large, deep, or facial burns.',
    keywords: ['scald', 'fire', 'heat', 'chemical', 'sunburn', 'blister'],
    steps: [
      'Remove from the heat source and cool the burn with cool (not ice-cold) running water for 10–20 minutes.',
      'Remove rings/jewelry near the burn before swelling starts.',
      'Cover loosely with cling film or a clean, non-fluffy cloth.',
      'Call 911 for burns larger than the palm, on the face/airway/hands/genitals, or any that are white/charred/deep.',
      'Do NOT apply butter, ointments, or ice; do NOT burst blisters.',
    ],
  },
  {
    id: 'heart-attack',
    illustration: 'heart-attack',
    title: 'Heart Attack',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'Signs of a blocked heart artery: chest pain, pressure, and spreading discomfort.',
    keywords: ['cardiac', 'mi', 'myocardial infarction', 'chest pain', 'angina'],
    steps: [
      'Call 911 immediately — do not drive yourself.',
      'Sit the person down, keep them calm and still, and loosen tight clothing.',
      'If not allergic and awake, give one adult aspirin (chew it) unless told otherwise by 911.',
      'If they become unresponsive and not breathing normally, begin CPR and use an AED.',
      'Note the time symptoms started — it matters for treatment.',
    ],
  },
  {
    id: 'stroke',
    illustration: 'stroke-fast',
    title: 'Stroke',
    category: 'Neurological',
    severity: 'critical',
    call911: true,
    summary: 'Sudden loss of brain function — act FAST.',
    keywords: ['brain attack', 'facial droop', 'slurred speech', 'weakness', 'tiA'],
    steps: [
      'Call 911 immediately — note the time symptoms began.',
      'Use FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911.',
      'Keep the person still, with the head slightly raised if breathing is okay.',
      'Do NOT give food, drink, or medication.',
      'Monitor breathing and be ready to start CPR if they become unresponsive.',
    ],
  },
  {
    id: 'seizure',
    illustration: 'recovery-position',
    title: 'Seizure',
    category: 'Neurological',
    severity: 'serious',
    call911: true,
    summary: 'Protect someone having a convulsive (tonic-clonic) seizure from injury.',
    keywords: ['convulsion', 'epilepsy', 'fit', 'spasm', 'unconscious shaking'],
    steps: [
      'Call 911 if it is the first seizure, lasts >5 minutes, repeats, or the person is injured/unresponsive after.',
      'Clear hard or sharp objects away; cushion the head.',
      'Roll the person onto their side once convulsing stops to keep the airway clear.',
      'Do NOT hold them down or put anything in their mouth.',
      'Stay until they are fully alert; offer reassurance as they wake.',
    ],
  },
  {
    id: 'anaphylaxis',
    illustration: 'epipen',
    title: 'Severe Allergic Reaction (Anaphylaxis)',
    category: 'Medical & Poisoning',
    severity: 'critical',
    call911: true,
    summary: 'A rapidly worsening allergic reaction that can close the airway.',
    keywords: ['allergy', 'epipen', 'epinephrine', 'swelling', 'hives', 'bee sting', 'nut'],
    steps: [
      'Call 911 — anaphylaxis is life-threatening.',
      'Use an epinephrine auto-injector (EpiPen) immediately if available; inject into the outer thigh.',
      'Lay the person flat with legs raised unless breathing is hard (then sit up).',
      'If no improvement in 5–15 minutes and a second injector is available, use it.',
      'Watch the airway; be ready to start CPR if they become unresponsive.',
    ],
  },
  {
    id: 'poisoning',
    illustration: 'poisoning',
    title: 'Poisoning',
    category: 'Medical & Poisoning',
    severity: 'critical',
    call911: true,
    summary: 'Suspected ingestion, inhalation, or skin contact with a harmful substance.',
    keywords: ['overdose', 'toxic', 'ingested', 'chemical', 'drug', 'poison control'],
    steps: [
      'Call 911, or contact Poison Control at 1-800-222-1222 in the US.',
      'Get the person away from the source (fresh air for inhaled poison).',
      'If on skin/eyes, rinse with running water for 15–20 minutes.',
      'If unconscious and not breathing, begin CPR; if vomiting, roll onto the side.',
      'Have the container/label ready for EMS — do NOT induce vomiting unless instructed.',
    ],
  },
  {
    id: 'fracture',
    illustration: 'fracture',
    title: 'Fractures & Sprains',
    category: 'Trauma & Wounds',
    severity: 'serious',
    call911: false,
    summary: 'Suspected broken bone or joint injury — immobilize and get care.',
    keywords: ['broken bone', 'sprain', 'strain', 'cast', 'swelling', 'dislocation'],
    steps: [
      'Call 911 if the bone protrudes, the limb is deformed, or there is heavy bleeding or numbness.',
      'Do NOT move the injured part or try to straighten it.',
      'Apply a cold pack wrapped in cloth to reduce swelling.',
      'Immobilize with a splint or sling; support the limb above and below the injury.',
      'Seek medical care for any suspected fracture to confirm with X-ray.',
    ],
  },
  {
    id: 'concussion',
    illustration: 'concussion',
    title: 'Head Injury & Concussion',
    category: 'Trauma & Wounds',
    severity: 'serious',
    call911: false,
    summary: 'A bump or blow to the head that shakes the brain; watch for worsening signs.',
    keywords: ['head bump', 'brain injury', 'tbi', 'dizzy', 'confused', 'knockout'],
    steps: [
      'Call 911 for loss of consciousness, repeated vomiting, unequal pupils, or worsening confusion.',
      'Keep the person still and awake; avoid bright screens and activity.',
      'Apply a cold pack to reduce swelling.',
      'Monitor closely for 24–48 hours for drowsiness, headache, or behavior changes.',
      'Do NOT give alcohol, aspirin, or ibuprofen in the first 24 hours.',
    ],
  },
  {
    id: 'hypothermia',
    illustration: 'hypothermia',
    title: 'Hypothermia',
    category: 'Environmental',
    severity: 'serious',
    call911: true,
    summary: 'Dangerously low body temperature from cold exposure.',
    keywords: ['cold', 'freezing', 'shivering', 'low temperature', 'exposure'],
    steps: [
      'Call 911 for severe shivering stopping, confusion, or unconsciousness.',
      'Move the person to a warm, dry place and remove wet clothing.',
      'Warm the center of the body first (chest, neck, groin) with blankets/skin-to-skin.',
      'Give warm, sweet (non-alcoholic, non-caffeinated) drinks if fully alert.',
      'Handle gently — rough movement can trigger dangerous heart rhythms.',
    ],
  },
  {
    id: 'frostbite',
    illustration: 'frostbite',
    title: 'Frostbite',
    category: 'Environmental',
    severity: 'serious',
    call911: false,
    summary: 'Frozen skin and tissue, usually on fingers, toes, nose, or ears.',
    keywords: ['frozen', 'cold injury', 'numb', 'white skin', 'ice'],
    steps: [
      'Move to a warm place and shelter the affected area.',
      'Do NOT rub the area or use direct heat (fire, heating pad).',
      'Warm slowly in lukewarm (not hot) water until skin is red and sensation returns.',
      'Loosely bandage and keep the area elevated and protected.',
      'Seek medical care; do NOT break blisters or walk on frostbitten feet.',
    ],
  },
  {
    id: 'heat-illness',
    illustration: 'heat-illness',
    title: 'Heat Exhaustion & Heat Stroke',
    category: 'Environmental',
    severity: 'critical',
    call911: true,
    summary: 'Overheating — heat stroke is a medical emergency with confusion or high temp.',
    keywords: ['overheating', 'sunstroke', 'dehydration', 'hot', 'fainting'],
    steps: [
      'Call 911 for heat stroke: confusion, fainting, hot/dry skin, or temperature above 103°F (39.4°C).',
      'Move the person to a cool, shaded place and loosen clothing.',
      'Cool rapidly: fan, cool wet cloths, or a cool bath.',
      'Give small sips of water if fully alert and not nauseated.',
      'Continue cooling until EMS arrives or the person recovers.',
    ],
  },
  {
    id: 'drowning',
    illustration: 'drowning',
    title: 'Drowning / Near-Drowning',
    category: 'Cardiac & Breathing',
    severity: 'critical',
    call911: true,
    summary: 'Rescue from water and restore breathing as fast as possible.',
    keywords: ['water', 'submersion', 'swimming', 'asphyxia', 'rescue'],
    steps: [
      'Call 911 and get the person out of the water without endangering yourself.',
      'If not breathing, begin rescue breaths and CPR immediately.',
      'Use an AED as soon as available.',
      'Even if the person seems fine, get medical evaluation — delayed lung complications can occur.',
      'Keep them warm to prevent hypothermia.',
    ],
  },
  {
    id: 'diabetic',
    illustration: 'diabetic',
    title: 'Diabetic Emergency',
    category: 'Medical & Poisoning',
    severity: 'serious',
    call911: false,
    summary: 'Very high or very low blood sugar causing confusion, sweating, or fainting.',
    keywords: ['diabetes', 'insulin', 'hypoglycemia', 'low sugar', 'glucose', 'ketoacidosis'],
    steps: [
      'Call 911 if the person is unconscious, seizing, or cannot swallow.',
      'If conscious and able to swallow, give sugar: juice, glucose tablets, or candy.',
      'Recheck in 15 minutes; repeat sugar if still symptomatic.',
      'If no improvement or symptoms are severe, call 911 and monitor airway.',
      'Do NOT give food/drink if drowsy or unresponsive — roll onto the side.',
    ],
  },
  {
    id: 'shock',
    illustration: 'shock-position',
    title: 'Shock',
    category: 'Trauma & Wounds',
    severity: 'critical',
    call911: true,
    summary: 'A life-threatening drop in blood flow to organs from injury or illness.',
    keywords: ['hypoperfusion', 'pale', 'clammy', 'weak pulse', 'fainting', 'trauma'],
    steps: [
      'Call 911 immediately — shock is an emergency.',
      'Lay the person flat, raise the legs about 12 inches (unless head/spine injury or broken leg).',
      'Keep them warm and calm; loosen tight clothing.',
      'Treat the cause (e.g., control bleeding) without moving them unnecessarily.',
      'Monitor breathing and be ready to start CPR if unresponsive.',
    ],
  },
  {
    id: 'fainting',
    illustration: 'recovery-position',
    title: 'Fainting',
    category: 'Neurological',
    severity: 'minor',
    call911: false,
    summary: 'Brief loss of consciousness, usually from low blood flow to the brain.',
    keywords: ['pass out', 'syncope', 'lightheaded', 'dizzy', 'blackout'],
    steps: [
      'Lay the person down and raise the legs; loosen tight clothing.',
      'Ensure fresh air and loosen collars; fan the face.',
      'Once alert, have them sit up slowly to avoid another faint.',
      'Call 911 if fainting follows chest pain, is with a head injury, or recurs.',
      'Offer water and rest; seek care if cause is unknown.',
    ],
  },
];

/** Return sorted, unique category names present in the data. */
export function getCategories() {
  return [...new Set(topics.map((t) => t.category))].sort();
}

/** Look up a single topic by its id (returns undefined if not found). */
export function getTopicById(id) {
  return topics.find((t) => t.id === id);
}
