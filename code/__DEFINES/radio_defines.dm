
//#define ATMOS_FIRE_FREQ 1437 //air alarms
//#define ENGINE_FREQ 1438 //engine components
//#define ATMOS_DISTRO_FREQ 1443 //distro loop
//#define ATMOS_TANKS_FREQ 1441 //atmos supply tanks
//#define BOT_BEACON_FREQ 1445 //bot navigation beacons
#define FREQ_AIRLOCK 		1449 //airlock controls, electropack, magnets // THIS MUST DIE

#define FREQ_RSD 			1457 //radio signal device - Not a real signal


#define FREQ_RADIO_LOW 		1200 //minimum radio freq
#define FREQ_PUBLIC_LOW 	1441 //minimum radio chat freq
#define FREQ_PUBLIC_HIGH 	1489 //maximum radio chat freq
#define FREQ_RADIO_HIGH 	1600 //maximum radio freq

#define FREQ_SYND 			1213
#define FREQ_SYNDTEAM 		1244
#define FREQ_DTH 			1341 //Special Operations
#define FREQ_AI 			1343
#define FREQ_ERT 			1345
#define FREQ_COMM 			1353 //Command
#define FREQ_PROC 			1339 //Procedure
#define FREQ_BOT 			1447 //mulebot, secbot, ed209
#define FREQ_ENT 			1351 //Entertainment

// Department channels
#define FREQ_PUB 			1459 //standard radio chat
#define FREQ_SEC 			1359 //security
#define FREQ_ENG 			1357 //engineering
#define FREQ_SCI 			1351 //science
#define FREQ_MED 			1355 //medical
#define FREQ_SUP 			1347 //cargo
#define FREQ_SRV 			1349 //service

// Internal department channels
#define FREQ_MED_I 			1485
#define FREQ_SEC_I 			1475

// Transmission methods
#define TRANSMISSION_WIRE	0
#define TRANSMISSION_RADIO	1

//This filter is special because devices belonging to default also receive signals sent to any other filter.
#define RADIO_DEFAULT 		"radio_default"
#define RADIO_TO_AIRALARM 	"radio_airalarm" //air alarms
#define RADIO_FROM_AIRALARM "radio_airalarm_rcvr" //devices interested in recieving signals from air alarms
#define RADIO_CHAT 			"radio_telecoms"
#define RADIO_ATMOSIA 		"radio_atmos"
#define RADIO_NAVBEACONS 	"radio_navbeacon"
#define RADIO_AIRLOCK 		"radio_airlock"
#define RADIO_SECBOT 		"radio_secbot"
#define RADIO_HONKBOT 		"radio_honkbot"
#define RADIO_MULEBOT 		"radio_mulebot"
#define RADIO_CLEANBOT 		"10"
#define RADIO_FLOORBOT 		"11"
#define RADIO_MEDBOT 		"12"
#define RADIO_MAGNETS 		"radio_magnet"
#define RADIO_LOGIC 		"radio_logic"

// Signal types
#define SIGNALTYPE_NORMAL       0
#define SIGNALTYPE_INTERCOM     (1<<0) // Will only broadcast to intercoms
#define SIGNALTYPE_INTERCOM_SBR (1<<1) // Will only broadcast to intercoms and station-bounced radios
#define SIGNALTYPE_AINOTRACK    (1<<2) // AI can't track down this person. Useful for imitation broadcasts where you can't find the actual mob

