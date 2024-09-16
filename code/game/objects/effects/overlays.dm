/obj/effect/overlay
	name = "overlay"
	var/i_attached//Added for possible image attachments to objects. For hallucinations and the like.

/obj/effect/overlay/singularity_act()
	return

/obj/effect/overlay/singularity_pull()
	return

/obj/effect/overlay/beam//Not actually a projectile, just an effect.
	name = "beam"
	icon = 'icons/effects/beam.dmi'
	icon_state = "b_beam"
	var/tmp/atom/BeamSource

/obj/effect/overlay/beam/New()
	..()
	QDEL_IN(src, 10)

/obj/effect/overlay/palmtree_r
	name = "Palm tree"
	icon = 'icons/misc/beach2.dmi'
	icon_state = "palm1"
	density = TRUE
	layer = 5

/obj/effect/overlay/palmtree_l
	name = "Palm tree"
	icon = 'icons/misc/beach2.dmi'
	icon_state = "palm2"
	density = TRUE
	layer = 5

/obj/effect/overlay/coconut
	name = "Coconuts"
	icon = 'icons/misc/beach.dmi'
	icon_state = "coconuts"

/obj/effect/overlay/sparkles
	name = "sparkles"
	icon = 'icons/effects/effects.dmi'
	icon_state = "shieldsparkles"

/obj/effect/overlay/adminoverlay
	name = "adminoverlay"
	icon = 'icons/effects/effects.dmi'
	icon_state = "admin"
	layer = 4.1

/obj/effect/overlay/wall_rot
	name = "Wallrot"
	desc = "Ick..."
	icon = 'icons/effects/wallrot.dmi'
	density = TRUE
	layer = 5
	mouse_opacity = MOUSE_OPACITY_TRANSPARENT

/obj/effect/overlay/wall_rot/New()
	..()
	pixel_x += rand(-10, 10)
	pixel_y += rand(-10, 10)

/// Door overlay for animating closets
/obj/effect/overlay/closet_door
	anchored = TRUE
	plane = FLOAT_PLANE
	layer = FLOAT_LAYER
	vis_flags = VIS_INHERIT_ID
	appearance_flags = KEEP_TOGETHER | LONG_GLIDE | PIXEL_SCALE