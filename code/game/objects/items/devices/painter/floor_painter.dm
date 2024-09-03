// Floor painter

/datum/painter/floor
	module_name = "floor painter"
	module_state = "floor_painter"

	var/floor_icon
	var/floor_state = "floor"
	var/floor_dir = SOUTH

	var/static/list/allowed_states = list("arrival", "arrivalcorner", "bar", "barber", "bcircuit", "black", "blackcorner", "blue", "bluecorner",
		"bluefull", "bluered", "blueyellow", "blueyellowfull", "bot", "brown", "browncorner", "browncornerold", "cafeteria", "caution",
		"cautioncorner", "cautionfull", "chapel", "cmo", "dark", "delivery", "escape", "escapecorner", "floor", "floorgrime", "freezerfloor", "gcircuit",
		"green", "greenblue", "greenbluefull", "greencorner", "greenfull", "greenyellow", "greenyellowfull", "grimy", "hydrofloor", "loadingarea", "neutral",
		"neutralcorner", "neutralfull", "orange", "orangecorner", "orangefull", "purple", "purplecorner", "purplefull", "rcircuit", "rampbottom", "ramptop", "red",
		"redblue", "redbluefull", "darkredblue", "darkredbluefull", "redcorner", "redfull", "redgreen", "redgreenfull", "darkredgreen", "darkredgreenfull",
		"redyellow", "redyellowfull", "darkredyellow", "darkredyellowfull", "warning", "warningcorner", "warnwhite", "warnwhitecorner", "white",
		"whiteblue", "whitebluecorner", "whitebluefull", "whitebot", "whitecorner", "whitedelivery", "whitegreen", "whitegreencorner", "whitegreenfull", "whitehall",
		"whitepurple", "whitepurplecorner", "whitepurplefull", "whitered", "whiteredcorner", "whiteredfull", "whiteyellow", "whiteyellowcorner", "whiteyellowfull",
		"yellow", "yellowcorner", "yellowcornersiding", "yellowsiding", "darkpurple", "darkpurplecorners", "darkpurplefull",
		"darkred", "darkredcorners", "darkredfull", "darkblue", "darkbluecorners", "darkbluefull", "darkgreen", "darkgreencorners",
		"darkgreenfull", "darkyellow", "darkyellowcorners", "darkyellowfull", "darkbrown", "darkbrowncorners", "darkbrownfull")

	// This is a double-list. First entry is the type key, second is the direction, with the final value being the b64 of the icon
	var/static/list/lookup_cache = list()

/datum/painter/floor/New(obj/item/painter/parent_painter)
	. = ..()
	if(!length(lookup_cache))
		for(var/style in allowed_states)
			if(!(style in lookup_cache))
				lookup_cache += style
				lookup_cache[style] = list()

			for(var/dir in GLOB.alldirs)
				var/icon/floor_icon = icon('icons/turf/floors.dmi', style, dir)
				// These indexes have to be strings otherwise it treats it as a list index not a map lookup index
				lookup_cache[style] += "[dir]"
				lookup_cache[style]["[dir]"] = icon2base64(floor_icon)

/datum/painter/floor/paint_atom(atom/target, mob/user)
	if(!istype(target, /turf/simulated/floor/plasteel))
		to_chat(user, "<span class='warning'>[holder] can only be used on station flooring.</span>")
		return
	var/turf/simulated/floor/plasteel/F = target

	if(F.icon_state == floor_state && F.dir == floor_dir)
		to_chat(user, "<span class='notice'>This is already painted [floor_state] [dir2text(floor_dir)]!</span>")
		return

	F.icon_state = floor_state
	F.icon_regular_floor = floor_state
	F.dir = floor_dir
	return TRUE

/datum/painter/floor/pick_color(mob/user)
	if(!user)
		return
	ui_interact(user)

/datum/painter/floor/ui_state(mob/user)
	return GLOB.inventory_state

/datum/painter/floor/ui_interact(mob/user, datum/tgui/ui = null)
	ui = SStgui.try_update_ui(user, src, ui)
	if(!ui)
		ui = new(user, src, "FloorPainter", module_name)
		// Disable automatic updates, because:
		// 1) we are the only user of the item, and don't expect to observe external changes
		// 2) generating and sending the icon each tick is a bit expensive, and creates small but noticeable lag
		ui.set_autoupdate(FALSE)
		ui.open()

/datum/painter/floor/ui_data(mob/user)
	var/list/data = list()
	data["availableStyles"] = allowed_states
	data["selectedStyle"] = floor_state
	data["selectedDir"] = dir2text(floor_dir)

	data["directionsPreview"] = list()
	for(var/dir in GLOB.alldirs)
		data["directionsPreview"][dir2text(dir)] = lookup_cache[floor_state]["[dir]"]

	return data


/datum/painter/floor/ui_static_data(mob/user)
	var/list/data = list()
	data["allStylesPreview"] = list()
	for(var/style in allowed_states)
		data["allStylesPreview"][style] = lookup_cache[style]["[SOUTH]"]

	return data

/datum/painter/floor/ui_act(action, params)
	if(..())
		return

	if(action == "select_style")
		var/new_style = params["style"]
		if(allowed_states.Find(new_style) != 0)
			floor_state = new_style

	if(action == "cycle_style")
		var/index = allowed_states.Find(floor_state)
		index += text2num(params["offset"])
		while(index < 1)
			index += length(allowed_states)
		while(index > length(allowed_states))
			index -= length(allowed_states)
		floor_state = allowed_states[index]

	if(action == "select_direction")
		var/dir = text2dir(params["direction"])
		if(dir != 0)
			floor_dir = dir

	return TRUE




// Floor painter

/datum/painter/decal
	module_name = "decal painter"
	module_state = "floor_painter"

	var/decal_icon
	var/decal_state = "/obj/effect/turf_decal/stripes/box"
	var/decal_dir = SOUTH

	//TODO: Make blacklist
	var/static/list/decal_blacklist = typecacheof(list(/obj/effect/turf_decal/raven, /obj/effect/turf_decal/weather, /obj/effect/turf_decal/stripes/asteroid))

	// This is a double-list. First entry is the type key, second is the direction, with the final value being the b64 of the icon
	var/static/list/lookup_cache_decals = list()

/datum/painter/decal/New(obj/item/painter/parent_painter)
	. = ..()
	if(!length(lookup_cache_decals))
		for(var/I in typesof(/obj/effect/turf_decal))
			if(I in decal_blacklist)
				continue
			var/obj/effect/turf_decal/decal = I
			if(!(decal in lookup_cache_decals))
				lookup_cache_decals += decal.icon_state
				lookup_cache_decals["[decal]"] = list(decal)

			for(var/dir in GLOB.alldirs)
				var/icon/decal_icon = icon(decal.icon, decal.icon_state, dir)
				// These indexes have to be strings otherwise it treats it as a list index not a map lookup index
				lookup_cache_decals["[decal]"] += "[dir]"
				lookup_cache_decals["[decal]"]["[dir]"] = icon2base64(decal_icon)

/datum/painter/decal/paint_atom(atom/target, mob/user)
	var/typepath = lookup_cache_decals["[decal_state]"][1]
	var/obj/effect/turf_decal/new_decal = new typepath(target, decal_dir)
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
		ui = new(user, src, "FloorPainter", module_name)
		// Disable automatic updates, because:
		// 1) we are the only user of the item, and don't expect to observe external changes
		// 2) generating and sending the icon each tick is a bit expensive, and creates small but noticeable lag
		ui.set_autoupdate(FALSE)
		ui.open()

/datum/painter/decal/ui_data(mob/user)
	var/list/data = list()
	var/list/decal_names = list()
	for(var/I in typesof(/obj/effect/turf_decal))
		if(I in decal_blacklist)
			continue
		var/obj/effect/turf_decal/decal = I
		decal_names += "[decal]"//.icon_state
	data["availableStyles"] = decal_names
	data["selectedStyle"] = decal_state
	data["selectedDir"] = dir2text(decal_dir)

	data["directionsPreview"] = list()
	for(var/dir in GLOB.alldirs)
		data["directionsPreview"][dir2text(dir)] = lookup_cache_decals[decal_state]["[dir]"]

	return data


/datum/painter/decal/ui_static_data(mob/user)
	var/list/data = list()
	data["allStylesPreview"] = list()
	var/list/decal_names = list()
	for(var/I in typesof(/obj/effect/turf_decal))
		if(I in decal_blacklist)
			continue
		var/obj/effect/turf_decal/decal = I
		decal_names += decal.icon_state
	for(var/style in typesof(/obj/effect/turf_decal))
		data["allStylesPreview"]["[style]"] = lookup_cache_decals["[style]"]["[SOUTH]"]

	return data

/datum/painter/decal/ui_act(action, params)
	if(..())
		return

	if(action == "select_style")
		var/new_style = params["style"]
		if(lookup_cache_decals.Find(new_style) != 0)
			decal_state = new_style

	if(action == "cycle_style")
		var/apple = "a"

	if(action == "select_direction")
		var/dir = text2dir(params["direction"])
		if(dir != 0)
			decal_dir = dir

	return TRUE
