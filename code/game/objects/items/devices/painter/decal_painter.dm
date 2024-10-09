/datum/painter/decal
	module_name = "decal painter"
	module_state = "floor_painter"
	/// icon that contains the decal sprites
	var/decal_icon = 'icons/turf/decals.dmi'
	/// icon_state of the selected decal
	var/decal_state = "warn_box"
	var/decal_dir = SOUTH
	/// When removal_mode is TRUE the decal painter will remove decals instead
	var/removal_mode = FALSE
	var/max_decals = 3
	var/static/list/decal_blacklist = typecacheof(
		list(
			/obj/effect/turf_decal/raven,
			/obj/effect/turf_decal/weather,
			/obj/effect/turf_decal/stripes/asteroid,
			/obj/effect/turf_decal/tile,
			/obj/effect/turf_decal/sand
		)
	)
	/// Assoc list with icon_state of the decal as the key, and decal path as the value.
	var/static/list/lookup_cache_decals = list()

/datum/painter/decal/New(obj/item/painter/parent_painter)
	. = ..()
	if(!length(lookup_cache_decals))
		for(var/D in subtypesof(/obj/effect/turf_decal))
			var/obj/effect/turf_decal/decal = D
			if(decal in decal_blacklist)
				continue
			lookup_cache_decals[decal::icon_state] = decal

/datum/painter/decal/paint_atom(atom/target, mob/user)
	if(!istype(target, /turf/simulated/floor))
		to_chat(user, "<span class='warning'>[holder] can only be used on flooring.</span>")
		return FALSE
	var/decals = target.GetComponents(/datum/component/decal)
	if(removal_mode)
		remove_decals(target)
		return TRUE
	if(length(decals) >= max_decals)
		to_chat(user, "<span class='warning'>You can't fit more decals on the [target].</span>")
		return FALSE
	var/typepath = lookup_cache_decals[decal_state]
	new typepath(get_turf(target), decal_dir)
	return TRUE

/datum/painter/decal/pick_color(mob/user)
	if(!user)
		return
	ui_interact(user)

/datum/painter/decal/ui_state(mob/user)
	return GLOB.inventory_state

/datum/painter/decal/ui_interact(mob/user, datum/tgui/ui = null)
	ui = SStgui.try_update_ui(user, src, ui)
	if(!ui)
		ui = new(user, src, "DecalPainter", module_name)
		ui.set_autoupdate(FALSE)
		ui.open()

/datum/painter/decal/ui_data(mob/user)
	var/list/data = list()
	data["selectedStyle"] = decal_state
	data["selectedDir"] = decal_dir
	data["removalMode"] = removal_mode

	return data


/datum/painter/decal/ui_static_data(mob/user)
	var/list/data = list()
	data["icon"] = decal_icon
	data["availableStyles"] = list()
	for(var/decal in lookup_cache_decals)
		data["availableStyles"] += decal

	return data

/datum/painter/decal/ui_act(action, params)
	if(..())
		return

	if(action == "select_style")
		var/new_style = params["style"]
		if(lookup_cache_decals.Find(new_style) != 0)
			decal_state = new_style
			removal_mode = FALSE

	if(action == "cycle_style")
		var/index = lookup_cache_decals.Find(decal_state)
		index += params["offset"]
		while(index < 1)
			index += length(lookup_cache_decals)
		while(index > length(lookup_cache_decals))
			index -= length(lookup_cache_decals)
		decal_state = lookup_cache_decals[index]
		removal_mode = FALSE

	if(action == "select_direction")
		var/dir = params["direction"]
		removal_mode = FALSE
		if(dir != 0)
			decal_dir = dir

	if(action == "removal_mode")
		removal_mode = !removal_mode
	return TRUE

/datum/painter/decal/proc/remove_decals(atom/target)
	var/turf/target_turf = get_turf(target)
	var/decals = target_turf.GetComponents(/datum/component/decal)
	for(var/datum/component/decal/D in decals)
		D.Destroy()
