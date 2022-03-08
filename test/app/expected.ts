export const expectedAskForPerkOutput = {
  listen: true,
  message: {
    speech: '<speak>Which equipment perk would you like to know about?</speak>',
    text: 'Which equipment perk would you like to know about?',
  },
}

export const expectedShellPerkOutput = {
  card: {
    content:
      'According to ZenithMMO Fandom Wiki, Shell is a passive perk with the following effect: Increases Armor (may not be working)',
    title: 'Shell',
  },
  listen: false,
  message: {
    speech:
      '<speak>According to ZenithMMO Fandom Wiki, Shell is a passive perk with the following effect: Increases Armor (may not be working)</speak>',
    text: 'According to ZenithMMO Fandom Wiki, Shell is a passive perk with the following effect: Increases Armor (may not be working)',
  },
}

export const expectedGodkingPassionPerkOutput = {
  card: {
    content:
      "According to ZenithMMO Fandom Wiki, Godking's Passion is an active perk with the following effect: On ability use, +4% AP for 30 seconds.  (Cooldown:6 seconds). Maximum 5 stack (+20% AP).",
    title: "Godking's Passion",
  },
  listen: false,
  message: {
    speech:
      "<speak>According to ZenithMMO Fandom Wiki, Godking's Passion is an active perk with the following effect: On ability use, +4% AP for 30 seconds.  (Cooldown:6 seconds). Maximum 5 stack (+20% AP).</speak>",
    text: "According to ZenithMMO Fandom Wiki, Godking's Passion is an active perk with the following effect: On ability use, +4% AP for 30 seconds.  (Cooldown:6 seconds). Maximum 5 stack (+20% AP).",
  },
}
