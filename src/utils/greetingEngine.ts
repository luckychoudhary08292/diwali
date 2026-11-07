import { CardThemeColor, GeneratedWish, OccasionType, ToneType, WishRequest } from '../types';

interface TemplateBundle {
  headlines: string[];
  openers: (name: string) => string[];
  bodies: (name: string, custom?: string) => string[];
  affirmations: string[];
  signoffs: (sender?: string) => string[];
  recommendedColors: CardThemeColor[];
}

const WISH_TEMPLATES: Record<OccasionType, Record<ToneType, TemplateBundle>> = {
  everyday: {
    warm: {
      headlines: [
        'A Gentle Ray of Warmth Just for You',
        'Wishing You Gentle Peace & Quiet Joys',
        'May Today Be Unusually Kind to You',
        'Sending Soft Smiles Across the Distance'
      ],
      openers: (name) => [
        `Dear ${name},`,
        `Dearest ${name},`,
        `Thinking of you today, ${name},`,
        `Hello ${name}, warm soul,`
      ],
      bodies: (name, custom) => [
        `I hope this moment finds you pausing to breathe deeply. Whatever today asks of you, remember that you bring an extraordinary, steady light to the people lucky enough to know you.${custom ? ` May your love for ${custom} keep your spirit shining bright.` : ''}`,
        `Just a gentle reminder that you don't have to carry everything at once. Take time for the small delights—the first warm sip of your drink, the quiet between errands, and the comfort of being exactly who you are.${custom ? ` Wishing you special moments with ${custom} today.` : ''}`,
        `May your day be painted with quiet triumphs, unexpected laughter, and little reminders of how deeply appreciated you are.${custom ? ` May ${custom} bring an extra spring to your step today.` : ''}`
      ],
      affirmations: [
        'You are cherished more than ordinary days let you know.',
        'May gentle ease accompany every step you take today.',
        'Your presence alone makes the world softer and brighter.'
      ],
      signoffs: (sender) => [
        sender ? `With all my heart, ${sender}` : 'Warmly & always,',
        sender ? `Sending love your way, ${sender}` : 'With tender wishes,',
        sender ? `Rooting for you every day, ${sender}` : 'Warmest thoughts,'
      ],
      recommendedColors: ['amber', 'rose', 'sage']
    },
    playful: {
      headlines: [
        'An Official Delivery of High-Five Energy',
        'Warning: High Dosage of Smiles Incoming',
        'Certified Good Vibes for a Certified Legend',
        'Drop Everything: A Cheerful Note Has Landed'
      ],
      openers: (name) => [
        `Hey ${name}!`,
        `What's cooking, ${name}?`,
        `To the one and only ${name},`,
        `Attention, ${name}:`
      ],
      bodies: (name, custom) => [
        `If the universe forgot to tell you this morning: you are an absolute rockstar. May your coffee hit the sweet spot, your playlists have zero skips, and your day unfold with pure effortless swagger!${custom ? ` Also, hope you get your daily dose of ${custom}!` : ''}`,
        `Sending you a quick virtual confetti cannon! May your traffic lights turn green, your battery stay above 80%, and your day be 100% free of pointless meetings.${custom ? ` Time to conquer the world and enjoy some ${custom}!` : ''}`,
        `You deserve an unsolicited standing ovation today just for being so contagiously awesome. Go forth and shine so bright they need shades!${custom ? ` Extra points today for celebrating ${custom}!` : ''}`
      ],
      affirmations: [
        'Keep being your ridiculously wonderful self.',
        'The world is genuinely more fun with you around.',
        'Smile big—it looks outrageously good on you.'
      ],
      signoffs: (sender) => [
        sender ? `Your biggest fan, ${sender}` : 'Cheers & high fives,',
        sender ? `With playful chaos & love, ${sender}` : 'Big hugs & smiles,',
        sender ? `Catch ya soon, ${sender}` : 'Stay legendary,'
      ],
      recommendedColors: ['amber', 'violet', 'rose']
    },
    poetic: {
      headlines: [
        'Between the Sunlight and the Morning Breeze',
        'Quiet Graces on a Golden Afternoon',
        'Like Starlight Lingering on Still Waters',
        'A Soft Symphony of Well-Wishes'
      ],
      openers: (name) => [
        `Beloved ${name},`,
        `For ${name}, in quiet reflection,`,
        `Dear ${name},`,
        `To ${name}, of gentle spirit,`
      ],
      bodies: (name, custom) => [
        `May the morning dawn softly upon your thoughts, like first light filtering through quiet leaves. Let the hours unfold with measured grace, offering you pockets of stillness amidst the rush of the world.${custom ? ` May the simple poetry of ${custom} stir your heart today.` : ''}`,
        `There is an unspoken melody in the days we take time to truly see. May you find rhythm in the quiet moments, beauty in the ordinary shadows, and an abiding peace that anchors you from within.${custom ? ` May ${custom} be your quiet sanctuary today.` : ''}`,
        `Like morning dew clinging to blossom petals, may grace rest gently upon your day. You weave quiet wonder into the fabric of everyday life simply by walking through it with genuine heart.${custom ? ` Thinking of you and the joy of ${custom}.` : ''}`
      ],
      affirmations: [
        'Where there is peace, may you find your rest.',
        'Your soul carries the quiet beauty of a timeless verse.',
        'May serenity be the light that guides your path.'
      ],
      signoffs: (sender) => [
        sender ? `Yours in quiet fond regard, ${sender}` : 'In gentle reflection,',
        sender ? `With serene affection, ${sender}` : 'Ever peacefully,',
        sender ? `Held in warm remembrance, ${sender}` : 'With poetic grace,'
      ],
      recommendedColors: ['sage', 'indigo', 'violet']
    },
    inspiring: {
      headlines: [
        'Stand Tall, Breathe Deep, and Rise',
        'You Hold Boundless Potential Today',
        'The Stage Is Yours: Make It Resonating',
        'Bold Steps Forward Into Your Power'
      ],
      openers: (name) => [
        `${name}, visionary,`,
        `Dear ${name},`,
        `To the relentless ${name},`,
        `Greetings ${name},`
      ],
      bodies: (name, custom) => [
        `Every sunrise brings a clean slate and fresh canvas. Whatever doubts try to whisper in your ear, remember how much resilience and wisdom you've built to stand where you are right now.${custom ? ` Let your dedication to ${custom} fuel your fire.` : ''}`,
        `You don't need permission to be exceptional. Trust your instincts, take the bold step, and let your courage speak louder than any hesitation. You are fully equipped for what lies ahead.${custom ? ` Bring that unstoppable energy to ${custom}!` : ''}`,
        `Strength isn't about having all the answers at once; it's about stepping into each challenge with an unshakeable belief that you can learn and grow through it all.${custom ? ` Keep breaking through boundaries with ${custom}.` : ''}`
      ],
      affirmations: [
        'Your momentum is building with every single choice.',
        'Believe in your vision, even when the path is new.',
        'You are capable of far more than you give yourself credit for.'
      ],
      signoffs: (sender) => [
        sender ? `In solidarity & strength, ${sender}` : 'Forward & upward,',
        sender ? `Cheering for your greatness, ${sender}` : 'With unshakeable belief,',
        sender ? `Always in your corner, ${sender}` : 'To your bold journey,'
      ],
      recommendedColors: ['indigo', 'emerald', 'amber']
    }
  },
  birthday: {
    warm: {
      headlines: [
        'Celebrating Another Year of Your Beautiful Light',
        'Happy Birthday, A True Gift to Everyone Around You',
        'May This New Chapter Be Your Most Tender Yet',
        'A Day of Deep Joy, Gratitude, and Celebration'
      ],
      openers: (name) => [
        `Happy, Happy Birthday, sweetest ${name}!`,
        `Dearest ${name}, on your special day,`,
        `To our wonderful ${name},`,
        `Celebrating you today, dear ${name},`
      ],
      bodies: (name, custom) => [
        `On the day you were born, the world received an unforgettable gift. Looking back on the memories you create and the warmth you share, I hope your heart is full of happiness today.${custom ? ` Hope you get to indulge in lots of ${custom} as you celebrate!` : ''} May your upcoming year overflow with vibrant health, deep friendships, and dreams realized.`,
        `Blow out the candles knowing that every single one represents people who love you dearly and memories that won't ever fade. Take in all the love surrounding you today—you deserve every bit of it!${custom ? ` May this new age bring you so much more of ${custom}.` : ''}`,
        `Another trip around the sun, and you only grow more compassionate, radiant, and inspiring. May this milestone year unlock gentle peace, abundant happiness, and sweet surprises at every turn.${custom ? ` Wishing you special moments enjoying ${custom}!` : ''}`
      ],
      affirmations: [
        'The years suit you with wisdom, grace, and joy.',
        'May your new age be filled with your heart’s truest desires.',
        'You are loved today, tomorrow, and through all the years ahead.'
      ],
      signoffs: (sender) => [
        sender ? `With endless birthday hugs, ${sender}` : 'With warm birthday love,',
        sender ? `Celebrating you always, ${sender}` : 'Happiest birthday wishes,',
        sender ? `With all my heart on your day, ${sender}` : 'Warm birthday embraces,'
      ],
      recommendedColors: ['rose', 'amber', 'violet']
    },
    playful: {
      headlines: [
        'Another Year Wiser, Still Dangerously Fun',
        'Happy Level Up Day! Time to Celebrate',
        'Age Is Just a Number (And Yours Is Fabulous)',
        'Sound the Alarms: It’s Birthday Season!'
      ],
      openers: (name) => [
        `Happy Birthday to the legend, ${name}!`,
        `Hey ${name}, level up unlocked!`,
        `Hip hip hooray, ${name}!`,
        `It’s official: ${name} is another year more epic!`
      ],
      bodies: (name, custom) => [
        `Don't worry about getting older—you're just upgrading to a vintage classic with premium features! Eat the extra slice of cake, dance like nobody's watching, and make at least three completely unreasonable birthday wishes.${custom ? ` Especially wishes involving unlimited ${custom}!` : ''}`,
        `Scientists have confirmed that people who have the most birthdays live the longest. So congratulations on your ongoing scientific achievement! Here’s to laughter, good snacks, and minimal adulting today.${custom ? ` Time for maximum ${custom} and zero chores!` : ''}`,
        `Another year of being undeniably fabulous, funny, and uniquely you. May your birthday be packed with zero stress, maximum dessert, and all the attention you secretly love!${custom ? ` Cheers to ${custom} and big smiles!` : ''}`
      ],
      affirmations: [
        'Cake calories do not count today. It is the law.',
        'You make aging look like an art form.',
        'Here’s to another year of glorious shenanigans.'
      ],
      signoffs: (sender) => [
        sender ? `Your partner in celebration, ${sender}` : 'Party on,',
        sender ? `With cake crumbs & love, ${sender}` : 'Big birthday cheers,',
        sender ? `Let’s celebrate soon, ${sender}` : 'Keep rocking,'
      ],
      recommendedColors: ['violet', 'rose', 'amber']
    },
    poetic: {
      headlines: [
        'A Garland of Golden Hours on Your Natal Day',
        'Like Rings in Ancient Cedar: A Year of Radiance',
        'Under a Canopy of Stars, We Celebrate You',
        'A Gentle Overture to Your New Solar Journey'
      ],
      openers: (name) => [
        `Dearest ${name}, on the anniversary of your birth,`,
        `To ${name}, beneath the birthday sky,`,
        `Beloved ${name},`,
        `For ${name}, as a new cycle begins,`
      ],
      bodies: (name, custom) => [
        `As the earth completes another celestial loop since your arrival, we pause to celebrate the light you impart to this world. May your days ahead unfold like the opening of delicate petals, fragrant with hope, rich in quiet wisdom, and luminous with love.${custom ? ` May your path weave through the wonders of ${custom}.` : ''}`,
        `Another candle burns bright, casting warm illumination on the memories behind and the unwritten adventures ahead. May your coming seasons be rich in peaceful mornings, deep kinship, and sunsets that take your breath away.${custom ? ` May ${custom} accompany your heart’s quiet journey.` : ''}`,
        `You carry grace as effortlessly as the river carries light. On this day, we honor the life you lead and the kindness you sew in the lives of those you touch.${custom ? ` With tender thoughts of ${custom} and your happiness.` : ''}`
      ],
      affirmations: [
        'May time crown you with peaceful abundance.',
        'Every year with you is an exquisite gift to the world.',
        'Walk gently into your new year; beauty awaits.'
      ],
      signoffs: (sender) => [
        sender ? `With eternal fond wishes, ${sender}` : 'In celebratory grace,',
        sender ? `Yours in celebration of your light, ${sender}` : 'Ever lovingly,',
        sender ? `With poetic devotion, ${sender}` : 'Blessings upon your year,'
      ],
      recommendedColors: ['indigo', 'sage', 'rose']
    },
    inspiring: {
      headlines: [
        'A Bold New Year: Your Greatest Chapter Begins',
        'Celebrate How Far You’ve Come & Where You’re Going',
        'Unleash Your Greatness in This New Year of Life',
        'New Milestones, Limitless Skies, Happy Birthday!'
      ],
      openers: (name) => [
        `Happy Birthday, ${name}!`,
        `${name}, to your most empowered year yet!`,
        `Celebrating your journey today, ${name},`,
        `To the extraordinary ${name},`
      ],
      bodies: (name, custom) => [
        `Take a moment today to look back at the hurdles you conquered, the strength you forged, and the mountains you quietly moved this past year. You are standing on the threshold of something monumental.${custom ? ` Keep pursuing ${custom} with that fierce, brilliant drive!` : ''} This new age is your invitation to soar even higher.`,
        `Your potential doesn't have an expiration date—it deepens with every chapter you write. Step into this new year with bold conviction, knowing that your passions, talents, and determination are ready to light up the world.${custom ? ` May ${custom} be the catalyst for your next great triumph.` : ''}`,
        `Birthdays are not merely markers of time; they are launches into grander horizons. May this year reward your dedication, open doors you never dreamed of, and bring fulfilling milestones!${custom ? ` Keep leading the way in ${custom}!` : ''}`
      ],
      affirmations: [
        'Your best, most powerful days are right in front of you.',
        'Trust your trajectory; greatness is in your nature.',
        'May every door of opportunity swing open for you.'
      ],
      signoffs: (sender) => [
        sender ? `Cheering on your every breakthrough, ${sender}` : 'To your bold ascent,',
        sender ? `With admiration and support, ${sender}` : 'Always in your corner,',
        sender ? `Rooting for your biggest year yet, ${sender}` : 'Onward & upward,'
      ],
      recommendedColors: ['amber', 'emerald', 'indigo']
    }
  },
  gratitude: {
    warm: {
      headlines: [
        'From the Depths of My Heart, Thank You',
        'Your Kindness Made All the Difference',
        'A Heart Overflowing With Gratitude for You',
        'Grateful for Your Generous, Tender Spirit'
      ],
      openers: (name) => [
        `Dearest ${name},`,
        `Dear ${name},`,
        `To my wonderful friend ${name},`,
        `Sweet ${name},`
      ],
      bodies: (name, custom) => [
        `I am writing this because words sometimes feel too small for how thankful I am for you. Your presence, your listening ear, and the effortless way you show up are things I will never take for granted.${custom ? ` Your thoughtfulness around ${custom} meant the absolute world to me.` : ''}`,
        `In a world that is often hurried and loud, your genuine thoughtfulness is like a breath of fresh morning air. Thank you for being someone I can count on, and for leaving such beautiful fingerprints of kindness on my life.${custom ? ` Especially grateful for how you shared ${custom}.` : ''}`,
        `You didn't have to be as kind, generous, or understanding as you were, yet you gave with an open heart. Thank you from the bottom of my soul.${custom ? ` Knowing your passion for ${custom} makes me appreciate you even more.` : ''}`
      ],
      affirmations: [
        'Your kindness creates ripples that travel farther than you see.',
        'The world needs more souls as selfless and warm as yours.',
        'May the goodness you give out return to you tenfold.'
      ],
      signoffs: (sender) => [
        sender ? `With profound gratitude & love, ${sender}` : 'With all my thanks,',
        sender ? `Forever grateful for you, ${sender}` : 'Deeply thankful,',
        sender ? `Warmest gratitude always, ${sender}` : 'With heartfelt thanks,'
      ],
      recommendedColors: ['rose', 'amber', 'sage']
    },
    playful: {
      headlines: [
        'You’re the Real MVP (And You Know It)',
        'Not All Heroes Wear Capes, Some Just Do This',
        'A Million Internet Points to You!',
        'You Deserve a Medal and an Extra Large Treat'
      ],
      openers: (name) => [
        `Hey ${name}, superstar!`,
        `To ${name}, absolute lifesaver:`,
        `Dear ${name},`,
        `Attention, legend ${name}:`
      ],
      bodies: (name, custom) => [
        `If gratitude were pizza, I would order you a lifetime supply of the world's finest slices! Seriously, thank you so much for being so ridiculously helpful, patient, and awesome.${custom ? ` You crushed it with ${custom}!` : ''}`,
        `You officially win the award for coolest, kindest human in the tri-state area. Thank you for saving the day and making it look completely effortless!${custom ? ` Big cheers for the ${custom} magic!` : ''}`,
        `I’m pretty sure you have a secret superhero identity. How else could you be this helpful and awesome? Thank you a billion times over!${custom ? ` Extra points for ${custom} greatness!` : ''}`
      ],
      affirmations: [
        'You are 10 out of 10, would definitely recommend.',
        'A round of applause for your legendary kindness.',
        'You’ve made my day a whole lot better.'
      ],
      signoffs: (sender) => [
        sender ? `Your forever indebted pal, ${sender}` : 'Cheers & gratitude,',
        sender ? `High-fives forever, ${sender}` : 'You rock,',
        sender ? `Big thanks from ${sender}` : 'Endlessly appreciative,'
      ],
      recommendedColors: ['amber', 'emerald', 'violet']
    },
    poetic: {
      headlines: [
        'Gratitude Like Evening Rain on Thirsty Soil',
        'A Quiet Thank You, Spoken in Reverence',
        'For the Grace You So Freely Bestow',
        'Where Kindness Blossoms, My Heart Rests'
      ],
      openers: (name) => [
        `Dear ${name},`,
        `To ${name}, gracious soul,`,
        `For ${name}, in gratitude,`,
        `Beloved ${name},`
      ],
      bodies: (name, custom) => [
        `There are moments when someone touches our lives with such subtle, gentle grace that only a quiet thank you can truly hold it. You have been that light for me, and I hold your benevolence with deep reverence.${custom ? ` Your care regarding ${custom} will stay with me long into the seasons.` : ''}`,
        `Like blossoms opening under unhurried sunlight, your generosity has brought comfort and ease where it was needed most. Thank you for your tenderness of spirit.${custom ? ` In remembrance of ${custom} and your boundless heart.` : ''}`,
        `May the quiet seeds of kindness you scatter so unassumingly take root in peaceful gardens of your own. Thank you for walking through this world with such an open, generous hand.${custom ? ` Deeply touched by ${custom}.` : ''}`
      ],
      affirmations: [
        'In the quiet gallery of my heart, your kindness shines.',
        'May peace and gentle blessings crown your days.',
        'Goodness given in secret bears the sweetest harvest.'
      ],
      signoffs: (sender) => [
        sender ? `In boundless gratitude, ${sender}` : 'Yours in quiet thanks,',
        sender ? `With serene appreciation, ${sender}` : 'Gratefully and softly,',
        sender ? `Ever touched by your grace, ${sender}` : 'With deep reverence,'
      ],
      recommendedColors: ['sage', 'indigo', 'rose']
    },
    inspiring: {
      headlines: [
        'Your Generosity Inspires Everyone Around You',
        'Leadership, Heart, and True Fellowship',
        'Thank You for Setting the Standard of Excellence',
        'A Heartfelt Salute to Your Unwavering Support'
      ],
      openers: (name) => [
        `Dear ${name},`,
        `To the remarkable ${name},`,
        `${name}, with genuine appreciation,`,
        `Honoring you today, ${name},`
      ],
      bodies: (name, custom) => [
        `True strength is revealed not by how much someone takes, but by how generously they uplift others. Your support has been a pillar for me, inspiring me to aim higher and give back with equal conviction.${custom ? ` Your dedication to ${custom} exemplifies what true leadership means.` : ''}`,
        `Thank you for believing in me, for investing your time, and for showing me what genuine partnership looks like. You have created an impact that will resonate far into the future.${custom ? ` Grateful for your insights on ${custom}.` : ''}`,
        `When people write about character and honor, it is actions like yours they describe. Thank you for standing by me and making a meaningful difference when it mattered most.${custom ? ` Your influence in ${custom} continues to inspire.` : ''}`
      ],
      affirmations: [
        'The impact of your support will endure for years to come.',
        'You inspire greatness simply by being who you are.',
        'May your noble spirit continue to illuminate the way.'
      ],
      signoffs: (sender) => [
        sender ? `With highest regards & thanks, ${sender}` : 'With sincere appreciation,',
        sender ? `Saluting your generosity, ${sender}` : 'In deep appreciation,',
        sender ? `Inspired by you always, ${sender}` : 'With gratitude & respect,'
      ],
      recommendedColors: ['emerald', 'indigo', 'amber']
    }
  },
  encouragement: {
    warm: {
      headlines: [
        'You Are Stronger Than Any Storm You Face',
        'Take It One Gentle Breath at a Time',
        'I Believe in You, Even on the Hard Days',
        'There Is a Gentle Dawn Waiting on the Horizon'
      ],
      openers: (name) => [
        `Dear ${name},`,
        `To my resilient friend ${name},`,
        `Sweet ${name},`,
        `Holding space for you, ${name},`
      ],
      bodies: (name, custom) => [
        `I know things might feel heavy or uncertain right now, but please take a second to look back at all the storms you've already weathered. You have a quiet, steady courage inside you that will carry you through this too.${custom ? ` Keep holding onto ${custom} as your anchor.` : ''}`,
        `You don't need to have all the answers mapped out today. Just focus on the next small step, and trust that you are doing your very best. I am in your corner, always.${custom ? ` May ${custom} bring comfort to your tired shoulders.` : ''}`,
        `Be as patient and gentle with yourself as you would be with someone you love. You are growing through what you are going through, and brighter days are steadily making their way toward you.${custom ? ` Thinking of you as you navigate ${custom}.` : ''}`
      ],
      affirmations: [
        'One breath, one step, one day at a time.',
        'You do not have to be fearless to be brave.',
        'You are worthy of rest, gentleness, and joy.'
      ],
      signoffs: (sender) => [
        sender ? `Holding your hand in spirit, ${sender}` : 'With gentle love,',
        sender ? `Always here whenever you need me, ${sender}` : 'Always in your corner,',
        sender ? `Wrapping you in warmest care, ${sender}` : 'With steadfast support,'
      ],
      recommendedColors: ['sage', 'amber', 'rose']
    },
    playful: {
      headlines: [
        'You’ve Got This in the Bag (No Question)',
        'Time to Show the World How It’s Done',
        'Doubt Has No Power Over You Today',
        'Cue the Rocky Theme Song: You’re Ready!'
      ],
      openers: (name) => [
        `Hey ${name}! Listen up:`,
        `To champion ${name}:`,
        `Dear ${name},`,
        `Attention ${name}:`
      ],
      bodies: (name, custom) => [
        `Whatever monster under the bed is trying to scare you: remind it that you are ten times scarier and way more stylish. Put on your favorite anthem, dust yourself off, and go knock this out of the park!${custom ? ` Time to show ${custom} who's boss!` : ''}`,
        `Friendly reminder that obstacles are just bonus points waiting to be scored. You have the brains, the grit, and the charm to make this work. Go get 'em!${custom ? ` Extra superpower unlocked for ${custom}!` : ''}`,
        `If anyone can pull this off, it's 100% you. I have already drafted your victory speech in my head. Now go make it reality!${custom ? ` Rocking ${custom} like a champ!` : ''}`
      ],
      affirmations: [
        'Pressure makes diamonds, and you are sparkling.',
        'You’ve survived 100% of your toughest days so far.',
        'Unstoppable is your middle name.'
      ],
      signoffs: (sender) => [
        sender ? `Your chief cheerleader, ${sender}` : 'Rooting for you,',
        sender ? `Ready to pop the confetti, ${sender}` : 'Go get them,',
        sender ? `Fist bumps and high fives, ${sender}` : 'With bold confidence,'
      ],
      recommendedColors: ['amber', 'violet', 'emerald']
    },
    poetic: {
      headlines: [
        'Roots Run Deep Beneath the Winter Frost',
        'The Mountain Waits, Patient for Your Footsteps',
        'Light Pierces Even the Heaviest Cloud',
        'Grace in the Quiet Struggle'
      ],
      openers: (name) => [
        `Beloved ${name},`,
        `To ${name}, of steadfast soul,`,
        `Dear ${name},`,
        `For ${name}, in the quiet hour,`
      ],
      bodies: (name, custom) => [
        `Like rivers that carve canyons out of ancient stone, strength is rarely loud or hurried. It is quiet persistence, faithful and enduring. Trust the steady unfolding of your own journey.${custom ? ` May ${custom} be your compass through the mist.` : ''}`,
        `Night may linger over the hillside, yet dawn has never once broken its promise. Trust the resilience resting silently within your chest—it has carried ancestors, and it will carry you.${custom ? ` Find solace in the quiet poetry of ${custom}.` : ''}`,
        `The oak does not fear the autumn wind; it simply lets go of what no longer serves and prepares for spring. Be gentle with your wintering seasons, for blossoms are gathering beneath the soil.${custom ? ` With tender contemplation of ${custom}.` : ''}`
      ],
      affirmations: [
        'Dawn is already on its quiet journey to meet you.',
        'You carry within you an unconquerable summer.',
        'Trust the wisdom of the path you are walking.'
      ],
      signoffs: (sender) => [
        sender ? `Yours in quiet solidarity, ${sender}` : 'Ever beside you,',
        sender ? `Holding light for your path, ${sender}` : 'With serene hope,',
        sender ? `With poetic empathy, ${sender}` : 'In patient faith,'
      ],
      recommendedColors: ['indigo', 'sage', 'violet']
    },
    inspiring: {
      headlines: [
        'Rise Up: Your Breakthrough Is Closer Than You Think',
        'Champions Are Forged in the Moments Nobody Sees',
        'Own Your Greatness and Refuse to Shrink',
        'Turn Adversity Into Your Greatest Fuel'
      ],
      openers: (name) => [
        `${name}, conqueror,`,
        `Dear ${name},`,
        `To the fearless ${name},`,
        `Stand tall, ${name}:`
      ],
      bodies: (name, custom) => [
        `Every great triumph in history was once an uphill battle that looked impossible. You were built for this challenge, and every obstacle in front of you is merely stepping stones to your crowning accomplishment.${custom ? ` Harness your passion for ${custom} and lead the charge!` : ''}`,
        `Don't let temporary discomfort trick you into forgetting your permanent strength. Lock in on your target, silence the background noise, and claim the victory that is rightfully yours.${custom ? ` Let ${custom} be your defining victory.` : ''}`,
        `You have survived every single test that life has thrown at you. That isn't luck—that is discipline, endurance, and heart. Now step forward and conquer what is yours!${custom ? ` Bring that relentless focus to ${custom}!` : ''}`
      ],
      affirmations: [
        'You are the author of this comeback story.',
        'There is no limit to what your conviction can achieve.',
        'Walk like victory is already settled.'
      ],
      signoffs: (sender) => [
        sender ? `Unconditionally cheering you on, ${sender}` : 'To your triumph,',
        sender ? `With fierce belief in you, ${sender}` : 'Fight on & conquer,',
        sender ? `By your side in victory, ${sender}` : 'Unstoppable,'
      ],
      recommendedColors: ['emerald', 'indigo', 'amber']
    }
  },
  healing: {
    warm: {
      headlines: [
        'Wishing You Gentle Rest and Tender Recovery',
        'May Healing Surround You Like a Soft Blanket',
        'Sending Warm Hugs and Peaceful Restoration',
        'Take All the Time Your Body & Mind Need'
      ],
      openers: (name) => [
        `Dearest ${name},`,
        `Thinking of you, sweet ${name},`,
        `Dear ${name},`,
        `Sending healing thoughts, dear ${name},`
      ],
      bodies: (name, custom) => [
        `I am sending you the warmest, softest embrace from afar. Please give yourself full permission to rest completely, turn off the obligations, and let healing work its quiet miracles in you.${custom ? ` Hope you find comfort in ${custom} as you mend.` : ''}`,
        `Your health and peace of mind are the only priorities that matter right now. Sip something warm, snuggle into softness, and know that you are wrapped in love and prayers.${custom ? ` May memories of ${custom} bring peaceful warmth.` : ''}`,
        `May each passing hour bring a little more relief, each breath bring deeper ease, and each morning greet you with returning vitality. Take all the time in the world.${custom ? ` Looking forward to peaceful moments with ${custom} again soon.` : ''}`
      ],
      affirmations: [
        'Rest is sacred work; your body knows how to heal.',
        'Surrounded by love and quiet, steady renewal.',
        'May soothing comfort touch every place that aches.'
      ],
      signoffs: (sender) => [
        sender ? `With all my love and healing wishes, ${sender}` : 'With tender healing thoughts,',
        sender ? `Sending gentle hugs, ${sender}` : 'Warmest comfort,',
        sender ? `Thinking of you every hour, ${sender}` : 'Ever lovingly,'
      ],
      recommendedColors: ['rose', 'sage', 'amber']
    },
    playful: {
      headlines: [
        'Doctor’s Orders: Absolute Rest & Favorite Shows',
        'Speedy Recovery to My Favorite Patient',
        'Germs/Aches Be Gone: Eviction Notice Served!',
        'Sending You Supercharged Healing Energy'
      ],
      openers: (name) => [
        `Hey ${name}!`,
        `To ${name}, on the mend:`,
        `Dear ${name},`,
        `Sending cozy vibes, ${name}!`
      ],
      bodies: (name, custom) => [
        `I have officially declared you exempt from all chores, worries, and adulting until further notice. Your only job is to binge-watch good shows, nap unapologetically, and get pampered!${custom ? ` Extra points for enjoying ${custom} in bed!` : ''}`,
        `Sending you a mega-dose of get-well energy! Can’t wait to have you back at 100% so we can resume our normal mischief.${custom ? ` May ${custom} speed up the healing turbo boost!` : ''}`,
        `Get well soon, please! The world is definitely too boring without you walking around at full power. Drink lots of fluids and stay wrapped up like a cozy burrito!${custom ? ` Dream of good times with ${custom}!` : ''}`
      ],
      affirmations: [
        'Bed rest is the ultimate luxury; enjoy it thoroughly.',
        'Better, stronger, and more awesome every single day.',
        'You will be back on top before you know it.'
      ],
      signoffs: (sender) => [
        sender ? `With lots of soup & love, ${sender}` : 'Feel better soon,',
        sender ? `Your honorary nurse & cheerleader, ${sender}` : 'Speedy recovery wishes,',
        sender ? `Hugs from a safe distance, ${sender}` : 'Cozy get well hugs,'
      ],
      recommendedColors: ['amber', 'emerald', 'rose']
    },
    poetic: {
      headlines: [
        'Quiet Waters for a Tired Heart',
        'Soft Light Upon the Healing Meadow',
        'The Gentle Balm of Restful Solitude',
        'A Serenade of Peace and Wholeness'
      ],
      openers: (name) => [
        `Dear ${name},`,
        `To ${name}, in gentle sanctuary,`,
        `Beloved ${name},`,
        `For ${name}, resting softly,`
      ],
      bodies: (name, custom) => [
        `May the quiet rhythm of the afternoon hush every anxiety, allowing tranquility to settle upon you like mist over a lake. Healing is a quiet blossom; it unfolds without haste under the tender watch of time.${custom ? ` May the gentle recollection of ${custom} soothe your spirit.` : ''}`,
        `Let the world outside rush if it must; your sanctuary is within this stillness. Like tired earth drinking the autumn rain, absorb every drop of nourishment and rest.${custom ? ` Whispering peace through the thought of ${custom}.` : ''}`,
        `May kind hands and quiet moments minister to your well-being. May restorative sleep knit strength back into your bones and lightness into your spirit.${custom ? ` Held in calm regard with ${custom}.` : ''}`
      ],
      affirmations: [
        'Within this sacred pause, renewal takes root.',
        'Peace be upon your resting hours.',
        'Health and tranquility are quietly restoring you.'
      ],
      signoffs: (sender) => [
        sender ? `In prayerful and loving peace, ${sender}` : 'In quiet blessing,',
        sender ? `Yours in serene devotion, ${sender}` : 'Tenderest regards,',
        sender ? `Held in deepest healing thoughts, ${sender}` : 'With peaceful grace,'
      ],
      recommendedColors: ['sage', 'indigo', 'violet']
    },
    inspiring: {
      headlines: [
        'Rebuilding, Restoring, and Rising Again',
        'Honor the Pause: You Will Return Even Stronger',
        'Patience and Resilience on the Road to Recovery',
        'New Vitality Awaits Your Steadfast Spirit'
      ],
      openers: (name) => [
        `Dear ${name},`,
        `To the enduring ${name},`,
        `${name}, steadfast soul,`,
        `Warm wishes, ${name}:`
      ],
      bodies: (name, custom) => [
        `Healing takes its own kind of warrior spirit—the courage to slow down, to listen to what your body is asking for, and to honor the process of rebuilding. You possess that wisdom.${custom ? ` Keep ${custom} as the bright beacon you are walking toward.` : ''}`,
        `Consider this period a masterclass in renewal. You are refilling the well so that when you step back into your passions, you do so with renewed clarity and invincible energy.${custom ? ` Your comeback in ${custom} will be nothing short of magnificent.` : ''}`,
        `Every day you heal is an investment in the long, fruitful road ahead. Take heart, respect your boundaries, and trust that your strength is silently multiplying.${custom ? ` Soon you’ll be celebrating ${custom} at full vitality!` : ''}`
      ],
      affirmations: [
        'Your body is resilient and your spirit is unbroken.',
        'Every day of rest is a foundation for future triumphs.',
        'Strength is returning to you in quiet abundance.'
      ],
      signoffs: (sender) => [
        sender ? `Standing beside you through every step, ${sender}` : 'To your complete restoration,',
        sender ? `With enduring faith in your recovery, ${sender}` : 'To your returning strength,',
        sender ? `Cheering your renewed vitality, ${sender}` : 'In steadfast health,'
      ],
      recommendedColors: ['emerald', 'sage', 'indigo']
    }
  },
  milestone: {
    warm: {
      headlines: [
        'So Immensely Proud of Everything You’ve Achieved',
        'A Monumental Moment for an Extraordinary Person',
        'Honoring Your Dedication, Heart, and Triumph',
        'A Milestone Worthy of Endless Celebration'
      ],
      openers: (name) => [
        `Dearest ${name}, congratulations!`,
        `To our superstar ${name},`,
        `Dear ${name}, what a joyous day!`,
        `Celebrating this momentous day with you, ${name},`
      ],
      bodies: (name, custom) => [
        `Watching you reach this milestone fills my heart with unspeakable pride and joy. I know the quiet hours, the sacrifices, and the steadfast perseverance that paved the way to this victory.${custom ? ` Reaching this point with ${custom} is proof of your amazing soul.` : ''} Savor every drop of this achievement!`,
        `This is a moment you will look back on for the rest of your life with a warm smile. You earned every ounce of this success with integrity, grace, and unmatched dedication.${custom ? ` May your passion for ${custom} continue to bear sweet fruit.` : ''}`,
        `Huge congratulations on this well-deserved triumph! May this accomplishment be the doorway to even greater fulfillment and deep joy.${custom ? ` Raising a toast to you and ${custom}!` : ''}`
      ],
      affirmations: [
        'Your hard work has blossomed into pure brilliance.',
        'This is only the beginning of your grand adventure.',
        'May your success continue to inspire everyone around you.'
      ],
      signoffs: (sender) => [
        sender ? `With bursting pride and love, ${sender}` : 'With warmest congratulations,',
        sender ? `Cheering loudly for you, ${sender}` : 'With deep pride,',
        sender ? `Celebrating your triumph, ${sender}` : 'Heartfelt congrats,'
      ],
      recommendedColors: ['amber', 'emerald', 'rose']
    },
    playful: {
      headlines: [
        'Nailed It! Pop the Champagne & Confetti!',
        'You Did That! Standing Ovation Time!',
        'Bragging Rights Unlocked Forever',
        'Is There Anything You Can’t Do?!'
      ],
      openers: (name) => [
        `Holy smokes, ${name}! You did it!`,
        `BOOM! Massive congrats, ${name}!`,
        `To the victorious ${name}:`,
        `Ladies and gentlemen: ${name} has arrived!`
      ],
      bodies: (name, custom) => [
        `You came, you saw, you completely conquered! I always knew you had this in you, but seeing you pull it off with so much style is just next-level fun.${custom ? ` Give it up for the master of ${custom}!` : ''} Time to party like there's no tomorrow!`,
        `Stop being so overwhelmingly talented, you're making the rest of us look bad! Seriously though, huge congratulations on knocking this out of the atmosphere.${custom ? ` Celebrating your epic victory in ${custom}!` : ''}`,
        `Cue the fireworks, pop the corks, and take your victory lap! You worked like crazy for this, and now it's time to enjoy the sweet taste of victory.${custom ? ` High five for ${custom} dominance!` : ''}`
      ],
      affirmations: [
        'You officially belong on the hall of fame wall.',
        'Success looks ridiculously good on you.',
        'Take a bow; you earned every single cheer.'
      ],
      signoffs: (sender) => [
        sender ? `Your number one hypeman, ${sender}` : 'Cheers to the champion,',
        sender ? `Confetti cannon armed and fired, ${sender}` : 'Massive high fives,',
        sender ? `Let’s celebrate in style, ${sender}` : 'Victory cheers,'
      ],
      recommendedColors: ['violet', 'amber', 'emerald']
    },
    poetic: {
      headlines: [
        'The Summit Reached: A Vista of Endless Light',
        'When Vision Meets Virtue: An Golden Milestone',
        'Harvest of the Long Sowing: Honor & Joy',
        'A Tapestry of Dedication Woven into Triumph'
      ],
      openers: (name) => [
        `Honored ${name},`,
        `Dear ${name}, on this luminous pinnacle,`,
        `To ${name}, of visionary fortitude,`,
        `Beloved ${name},`
      ],
      bodies: (name, custom) => [
        `Like an artisan who patiently shapes marble until the sculpture breathes, your tireless devotion has transformed ambition into magnificent reality. Today the summit is beneath your feet, and the view is boundless.${custom ? ` May the grace of ${custom} forever reflect your brilliance.` : ''}`,
        `Years of unseen discipline and faithful intent have converged into this triumphant hour. Drink deeply from the fountain of this success, knowing that your character shone bright through every season.${custom ? ` In celebration of your dedication to ${custom}.` : ''}`,
        `May this proud milestone be a beacon to others who walk the trail behind you. You have proven that dreams nurtured with patience and sincerity become truth.${custom ? ` With poetic admiration for ${custom}.` : ''}`
      ],
      affirmations: [
        'Crown your head with the laurel of true accomplishment.',
        'You have carved your name upon the ledger of excellence.',
        'May this pinnacle be a stepping stone to higher summits.'
      ],
      signoffs: (sender) => [
        sender ? `With deepest reverence & pride, ${sender}` : 'In celebratory honor,',
        sender ? `Yours in shared rejoicing, ${sender}` : 'With poetic homage,',
        sender ? `Blessings on your summit, ${sender}` : 'Ever in admiration,'
      ],
      recommendedColors: ['indigo', 'sage', 'amber']
    },
    inspiring: {
      headlines: [
        'A Historic Achievement: The World Takes Notice',
        'Proof That Relentless Passion Conquers All',
        'You Set the Bar, Then You Leaped Right Over It',
        'To the Victor: The Future Belongs to You'
      ],
      openers: (name) => [
        `${name}, trailblazer,`,
        `Congratulations, ${name}!`,
        `To the victorious ${name},`,
        `Saluting your milestone, ${name}:`
      ],
      bodies: (name, custom) => [
        `Reaching this milestone isn't just a personal win—it is a masterclass in what happens when focus, grit, and passion refuse to compromise. You did what many thought couldn't be done, and you did it with absolute class.${custom ? ` Your achievement in ${custom} sets a brand new benchmark.` : ''}`,
        `Never forget this feeling of standing at the peak after climbing through the steepest cliffs. Let this victory be your fuel for every grand ambition on your horizon. The world needs leaders like you.${custom ? ` May ${custom} continue to propel you to world-class heights.` : ''}`,
        `You have proven that vision backed by tireless execution is unstoppable. Enjoy this crowning moment—you earned every single accolade, and the future is yours for the taking!${custom ? ` Onward to even greater triumphs with ${custom}!` : ''}`
      ],
      affirmations: [
        'You have turned potential into lasting legacy.',
        'This victory is a testament to your unshakeable will.',
        'Step forward into your destiny with head held high.'
      ],
      signoffs: (sender) => [
        sender ? `Saluting your triumph with highest respect, ${sender}` : 'To your continued ascent,',
        sender ? `Honored to witness your greatness, ${sender}` : 'With tremendous respect,',
        sender ? `Rooting for your next summit, ${sender}` : 'Forward to new heights,'
      ],
      recommendedColors: ['emerald', 'indigo', 'amber']
    }
  }
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePersonalizedWish(req: WishRequest, seedVariation?: number): GeneratedWish {
  const cleanRecipient = req.recipientName.trim();
  const cleanSender = req.senderName?.trim() || undefined;
  const cleanNote = req.customNote?.trim() || undefined;

  const bundle = WISH_TEMPLATES[req.occasion]?.[req.tone] || WISH_TEMPLATES.everyday.warm;

  // If a seed variation is provided, use it deterministically, otherwise random
  const idx = typeof seedVariation === 'number' ? Math.abs(seedVariation) : Math.floor(Math.random() * 100);

  const headline = bundle.headlines[idx % bundle.headlines.length];
  const opener = bundle.openers(cleanRecipient)[idx % bundle.openers(cleanRecipient).length];
  const bodyText = bundle.bodies(cleanRecipient, cleanNote)[idx % bundle.bodies(cleanRecipient, cleanNote).length];
  const greetingMessage = `${opener}\n\n${bodyText}`;
  const closingAffirmation = bundle.affirmations[idx % bundle.affirmations.length];
  const signOff = bundle.signoffs(cleanSender)[idx % bundle.signoffs(cleanSender).length];
  const themeColor = bundle.recommendedColors[idx % bundle.recommendedColors.length];

  return {
    id: `wish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    recipientName: cleanRecipient,
    senderName: cleanSender,
    occasion: req.occasion,
    tone: req.tone,
    headline,
    greetingMessage,
    closingAffirmation,
    signOff,
    themeColor,
    timestamp: Date.now()
  };
}
