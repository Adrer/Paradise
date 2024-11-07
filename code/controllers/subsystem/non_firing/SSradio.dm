SUBSYSTEM_DEF(radio)
	name = "Radio"
	flags = SS_NO_FIRE

	var/list/radiochannels = list(
	"Common"		= FREQ_PUB,
	"Science"		= FREQ_SCI,
	"Command"		= FREQ_COMM,
	"Procedure"		= FREQ_PROC,
	"Medical"		= FREQ_MED,
	"Engineering"	= FREQ_ENG,
	"Security" 		= FREQ_SEC,
	"Response Team" = FREQ_ERT,
	"Special Ops" 	= FREQ_DTH,
	"Syndicate" 	= FREQ_SYND,
	"SyndTeam" 		= FREQ_SYNDTEAM,
	"Supply" 		= FREQ_SUP,
	"Service" 		= FREQ_SRV,
	"AI Private"	= FREQ_AI,
	"Medical(I)"	= FREQ_MED_I,
	"Security(I)"	= FREQ_SEC_I
	)
	var/list/CENT_FREQS = list(FREQ_ERT, FREQ_DTH)
	var/list/ANTAG_FREQS = list(FREQ_SYND, FREQ_SYNDTEAM)
	var/list/DEPT_FREQS = list(FREQ_AI, FREQ_COMM, FREQ_ENG, FREQ_MED, FREQ_SEC, FREQ_SCI, FREQ_SRV, FREQ_SUP, FREQ_PROC)
	var/list/datum/radio_frequency/frequencies = list()

// This is a disgusting hack to stop this tripping CI when this thing needs to FUCKING DIE
/datum/controller/subsystem/radio/Initialize()
	return

// This is fucking disgusting and needs to die
/datum/controller/subsystem/radio/proc/frequency_span_class(frequency)
	// Antags!
	if(frequency in ANTAG_FREQS)
		return "syndradio"
	// centcomm channels (deathsquid and ert)
	if(frequency in CENT_FREQS)
		return "centradio"
	// This switch used to be a shit tonne of if statements. I am gonna find who made this and give them a kind talking to
	switch(frequency)
		if(FREQ_COMM)
			return "comradio"
		if(FREQ_AI)
			return "airadio"
		if(FREQ_SEC)
			return "secradio"
		if(FREQ_ENG)
			return "engradio"
		if(FREQ_SCI)
			return "sciradio"
		if(FREQ_MED)
			return "medradio"
		if(FREQ_SUP)
			return "supradio"
		if(FREQ_SRV)
			return "srvradio"
		if(FREQ_PROC)
			return "proradio"

	// If the above switch somehow failed. And it needs the SSradio. part otherwise it fails to compile
	if(frequency in DEPT_FREQS)
		return "deptradio"

	// If its none of the others
	return "radio"


/datum/controller/subsystem/radio/proc/add_object(obj/device as obj, new_frequency as num, filter = null as text|null)
	var/f_text = num2text(new_frequency)
	var/datum/radio_frequency/frequency = frequencies[f_text]

	if(!frequency)
		frequency = new
		frequency.frequency = new_frequency
		frequencies[f_text] = frequency

	frequency.add_listener(device, filter)
	return frequency

/datum/controller/subsystem/radio/proc/remove_object(obj/device, old_frequency)
	var/f_text = num2text(old_frequency)
	var/datum/radio_frequency/frequency = frequencies[f_text]

	if(frequency)
		frequency.remove_listener(device)

		if(length(frequency.devices) == 0)
			qdel(frequency)
			frequencies -= f_text

	return 1

/datum/controller/subsystem/radio/proc/return_frequency(new_frequency as num)
	var/f_text = num2text(new_frequency)
	var/datum/radio_frequency/frequency = frequencies[f_text]

	if(!frequency)
		frequency = new
		frequency.frequency = new_frequency
		frequencies[f_text] = frequency

	return frequency


// ALL THE SHIT BELOW THIS LINE ISNT PART OF THE SUBSYSTEM AND REALLY NEEDS ITS OWN FILE
