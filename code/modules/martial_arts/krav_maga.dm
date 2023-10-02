/datum/martial_art/krav_maga
	name = "Krav Maga"
	weight = 7 //Higher weight, since you can choose to put on or take off the gloves
	var/datum/action/neck_chop/neckchop = new/datum/action/neck_chop()
	var/datum/action/leg_sweep/legsweep = new/datum/action/leg_sweep()
	var/datum/action/lung_punch/lungpunch = new/datum/action/lung_punch()
	var/datum/action/neutral_stance/neutral = new/datum/action/neutral_stance()

/datum/action/neutral_stance
	name = "Neutral Stance - You relax, cancelling your last Krav Maga stance attack."
	button_icon_state = "neutralstance"

/datum/action/neutral_stance/Trigger(left_click)
	var/mob/living/carbon/human/H = owner
	if(!H.mind.martial_art.in_stance)
		to_chat(owner, "<b><i>You cannot cancel an attack you haven't prepared!</i></b>")
		return
	to_chat(owner, "<b><i>You cancel your prepared attack.</i></b>")
	owner.visible_message("<span class='danger'> [owner] relaxes [owner.p_their()] stance.</span>")
	H.mind.martial_art.combos.Cut()
	H.mind.martial_art.in_stance = FALSE

/datum/action/neck_chop
	name = "Neck Chop - Injures the neck, stopping the victim from speaking for a while."
	button_icon_state = "neckchop"

/datum/action/neck_chop/Trigger(left_click)
	var/mob/living/carbon/human/H = owner //This is a janky solution, but I want to refactor krav anyway and un-jank this (written in may 2023)
	if(!istype(H.mind.martial_art, /datum/martial_art/krav_maga))
		to_chat(owner, "<span class='warning'>You don't know how to do that right now.</span>")
		return
	if(owner.incapacitated())
		to_chat(owner, "<span class='warning'>You can't use Krav Maga while you're incapacitated.</span>")
		return
	to_chat(owner, "<b><i>Your next attack will be a Neck Chop.</i></b>")
	owner.visible_message("<span class='danger'>[owner] assumes the Neck Chop stance!</span>")
	H.mind.martial_art.combos.Cut()
	H.mind.martial_art.combos.Add(/datum/martial_combo/krav_maga/neck_chop)
	H.mind.martial_art.reset_combos()
	H.mind.martial_art.in_stance = TRUE
/datum/action/leg_sweep
	name = "Leg Sweep - Trips the victim, rendering them prone and unable to move for a short time."
	button_icon_state = "legsweep"

/datum/action/leg_sweep/Trigger(left_click)
	var/mob/living/carbon/human/H = owner
	if(!istype(H.mind.martial_art, /datum/martial_art/krav_maga))
		to_chat(owner, "<span class='warning'>You don't know how to do that right now.</span>")
		return
	if(owner.incapacitated())
		to_chat(owner, "<span class='warning'>You can't use Krav Maga while you're incapacitated.</span>")
		return
	if(!owner.get_num_legs())
		to_chat(owner, "<span class='warning'>You can't leg sweep someone if you have no legs.</spawn>")
		return
	to_chat(owner, "<b><i>Your next attack will be a Leg Sweep.</i></b>")
	owner.visible_message("<span class='danger'>[owner] assumes the Leg Sweep stance!</span>")
	H.mind.martial_art.combos.Cut()
	H.mind.martial_art.combos.Add(/datum/martial_combo/krav_maga/leg_sweep)
	H.mind.martial_art.reset_combos()
	H.mind.martial_art.in_stance = TRUE

/datum/action/lung_punch//referred to internally as 'quick choke'
	name = "Lung Punch - Delivers a strong punch just above the victim's abdomen, constraining the lungs. The victim will be unable to breathe for a short time."
	button_icon_state = "lungpunch"

/datum/action/lung_punch/Trigger(left_click)
	var/mob/living/carbon/human/H = owner
	if(!istype(H.mind.martial_art, /datum/martial_art/krav_maga))
		to_chat(owner, "<span class='warning'>You don't know how to do that right now.</span>")
		return
	if(owner.incapacitated())
		to_chat(owner, "<span class='warning'>You can't use Krav Maga while you're incapacitated.</span>")
		return
	to_chat(owner, "<b><i>Your next attack will be a Lung Punch.</i></b>")
	owner.visible_message("<span class='danger'>[owner] assumes the Lung Punch stance!</span>")
	H.mind.martial_art.combos.Cut()
	H.mind.martial_art.combos.Add(/datum/martial_combo/krav_maga/lung_punch)
	H.mind.martial_art.reset_combos()
	H.mind.martial_art.in_stance = TRUE

/datum/martial_art/krav_maga/teach(mob/living/carbon/human/H, make_temporary=0)
	..()
	if(HAS_TRAIT(H, TRAIT_PACIFISM))
		to_chat(H, "<span class='warning'>The arts of Krav Maga echo uselessly in your head, the thought of their violence repulsive to you!</span>")
		return
	to_chat(H, "<span class = 'userdanger'>You know the arts of Krav Maga!</span>")
	to_chat(H, "<span class = 'danger'>Place your cursor over a move at the top of the screen to see what it does.</span>")
	neutral.Grant(H)
	neckchop.Grant(H)
	legsweep.Grant(H)
	lungpunch.Grant(H)

/datum/martial_art/krav_maga/remove(mob/living/carbon/human/H)
	..()
	to_chat(H, "<span class = 'userdanger'>You suddenly forget the arts of Krav Maga...</span>")
	neutral.Remove(H)
	neckchop.Remove(H)
	legsweep.Remove(H)
	lungpunch.Remove(H)

/datum/martial_art/krav_maga/harm_act(mob/living/carbon/human/A, mob/living/carbon/human/D)
	MARTIAL_ARTS_ACT_CHECK
	add_attack_logs(A, D, "Melee attacked with [src]")
	var/picked_hit_type = pick("punches", "kicks")
	var/bonus_damage = 10
	if(IS_HORIZONTAL(D))
		bonus_damage += 5
		picked_hit_type = "stomps on"
	D.apply_damage(bonus_damage, BRUTE)
	if(picked_hit_type == "kicks" || picked_hit_type == "stomps")
		A.do_attack_animation(D, ATTACK_EFFECT_KICK)
		playsound(get_turf(D), 'sound/effects/hit_kick.ogg', 50, 1, -1)
	else
		A.do_attack_animation(D, ATTACK_EFFECT_PUNCH)
		playsound(get_turf(D), 'sound/effects/hit_punch.ogg', 50, 1, -1)
	D.visible_message("<span class='danger'>[A] [picked_hit_type] [D]!</span>", \
					"<span class='userdanger'>[A] [picked_hit_type] you!</span>")
	return TRUE

/datum/martial_art/krav_maga/disarm_act(mob/living/carbon/human/A, mob/living/carbon/human/D)
	MARTIAL_ARTS_ACT_CHECK
	A.do_attack_animation(D, ATTACK_EFFECT_DISARM)
	var/obj/item/I = D.get_active_hand()
	if(prob(60) && D.unEquip(I))
		if(!(QDELETED(I) || (I.flags & ABSTRACT)))
			A.put_in_hands(I)
		D.visible_message("<span class='danger'>[A] has disarmed [D]!</span>", \
							"<span class='userdanger'>[A] has disarmed [D]!</span>")
		playsound(D, 'sound/weapons/thudswoosh.ogg', 50, TRUE, -1)
	else
		D.visible_message("<span class='danger'>[A] attempted to disarm [D]!</span>", \
							"<span class='userdanger'>[A] attempted to disarm [D]!</span>")
		playsound(D, 'sound/weapons/punchmiss.ogg', 25, 1, -1)
	return TRUE

//Krav Maga Gloves

/obj/item/clothing/gloves/color/black/krav_maga
	var/datum/martial_art/krav_maga/style
	can_be_cut = FALSE
	resistance_flags = NONE

/obj/item/clothing/gloves/color/black/krav_maga/Initialize()
	. = ..()
	style = new()

/obj/item/clothing/gloves/color/black/krav_maga/equipped(mob/user, slot)
	if(!ishuman(user))
		return
	if(slot == slot_gloves)
		var/mob/living/carbon/human/H = user
		style.teach(H, TRUE)

/obj/item/clothing/gloves/color/black/krav_maga/dropped(mob/user)
	..()
	if(!ishuman(user))
		return
	var/mob/living/carbon/human/H = user
	if(H.get_item_by_slot(slot_gloves) == src)
		style.remove(H)

/obj/item/clothing/gloves/color/black/krav_maga/sec//more obviously named, given to sec
	name = "Krav Maga gloves"
	desc = "These gloves can teach you to perform Krav Maga using nanochips."
	icon_state = "fightgloves"
	item_state = "fightgloves"

/obj/item/clothing/gloves/color/black/krav_maga/sec/Initialize(mapload)
	. = ..()
	RegisterSignal(src, COMSIG_PARENT_QDELETING, PROC_REF(alert_admins_on_destroy))

/obj/item/clothing/gloves/color/black/krav_maga/combat // for nukies
	name = "Combat gloves plus"
	desc = "These combat gloves have been upgraded with nanochips that teach the wearer Krav Maga."
	icon_state = "combat"
	item_state = "swat_gl"
	siemens_coefficient = 0
	permeability_coefficient = 0.05
	strip_delay = 8 SECONDS
	cold_protection = HANDS
	min_cold_protection_temperature = GLOVES_MIN_TEMP_PROTECT
	heat_protection = HANDS
	max_heat_protection_temperature = GLOVES_MAX_TEMP_PROTECT
	resistance_flags = NONE
	armor = list(MELEE = 0, BULLET = 0, LASER = 0, ENERGY = 0, BOMB = 0, RAD = 0, FIRE = 200, ACID = 50)
