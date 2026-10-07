# yesnowww.com — Page topology

Full page is 22,714px at 1440×900. Only sections 1–2 are in scope for this clone.

| # | Section | Y range | Layout | Interaction model | In scope |
|---|---|---|---|---|---|
| 1 | Entry — curtain | 0–1800 (within sticky stage) | sticky 100vh stage inside 5vh section | scroll-driven (scrubbed) + time loop (flyer bob) | yes |
| 2 | Hero — framed tableau | revealed 0–900, animates 900–3600, fades at 3600 | same sticky stage, layer under the curtain | scroll-driven (scrubbed) + scroll-triggered timed (ball spin, fade) + time loops (tickers, rings) | yes |
| 3 | About | 4500–6570 | sticky wrapper | scroll-driven | no |
| 4 | Practice | 6570–12690 | sticky | scroll-driven | no |
| 5 | Action | 12690–15700 | sticky | scroll-driven | no |
| 6 | Cast | 15700–19400 | sticky | scroll-driven | no |
| 7 | Trusted | 19400–21700 | sticky | scroll-driven | no |
| 8 | Form + footer | 21700–22714 | flow | click | no |

Overlays: fixed particles canvas (z 2), fixed menu button (z 10, appears at 4500).
Page background: black for 0–4997.

## Stage slot map (px at 1440×900; origin top-left of stage)
| Slot | Box (x, y, w, h) | Anchor rule | z |
|---|---|---|---|
| Lamp L / R | 80,589,200,311 / 1160,589,200,311 | bottom 0; 80px from edge | 10 |
| Curtain L / R | −29,0,749,900 / 720,0,749,900 (+6 / −6 x) | 52% wide, overlap 12px at center | 9 |
| Flyer L (in curtain L) | 410,170,346,361 | right edge = center+36 | 9 |
| Flyer R (in curtain R) | 714,200,346,390 | left edge = center−6 | 9 |
| Meteor strip | −3400,198,3000,600 | rotate 6°, starts y −300 | 7 |
| Meteor ball (in strip) | 2396,51,414,411 | rotate 13° | 7 |
| Hero layer | 0,0,1440,900 bg rgb(0,20,130) | inset 0 | 1 |
| Frame (bands, medallions, black mask) | full stage | edge offsets | top of hero |
| Backdrop | 0,50,1440,800 | inset-y 50 | hero −1 |
| Bush | 0,680,1440,220 | bottom 0, h 15.3vw | |
| Tree | 16,10,1408,453 | 16px side inset | 1 |
| Star L / R | center∓72, y 70, 20×28 | | |
| Moon L / R | center∓72, y 110, 36×36 | | 0 |
| Sun | center, y 67, 76×76 | | 0 |
| Frond L / R | center∓158.5, y 58, 171×171 | | 4 |
| Flag L / R | center∓274, y 120, 110×377 | | 2 |
| Emblem | 420,55,600,850 | centered | 3 |
| Hand L / R | center∓288, y 493, 539×457 | | 5 |
| Standing figure L / R | 135,418 / 992,418, 313×446 | 135px from edge, bottom 36 | 3 / 4 |
| Seated figure L / R | −13,622 / 1172,622, 281×223 | −13px from edge, bottom 55 | 4 |
| Cloud L / R | −87,45 / 986,45, 544×115 | −90px from edge | 4 |
| Side head L / R | 10,115 / 1252,115, 178×630 | 10px from edge | 5 |
| Side flower L / R | 76,125 / 1039,125, 325×527 | 76px from edge | 5 |

Left-side elements are horizontal mirrors of the right-side ones.
