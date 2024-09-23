import { useBackend } from '../backend';
import { Box, Button, LabeledList, Section, Stack } from '../components';
import { Window } from '../layouts';

const incorrect_planets = ["Eath", "Marks", "Lunao", "Jabon 4", "Old Canaan", "Mauna-P", "Daohmai", "Gomhes", "Zrerrballak", "Xarqis", "Soorlm", "Urum", "Baron 1", "Kelunte", "Daltedt"]

const incorrect_jobs = ["Syndicate Operative", "Syndicate Researcher", "Veterinary", "Brig Physician",
"Pod Pilot", "Cremist", "Cluwne", "Work Safety Inspector", "Musician",
"Chauffeur", "Teacher", "Maid", "Plumber", "Trader", "Hobo", "NT CEO",
"Mime", "Assitant", "Janittor", "Medical", "Generticist", "Baton Officer",
"Detecctive", "Sccientist", "Robocticist", "Cargo Tecchhnician", "Internal Afairs Agent"]

const incorrect_records = ["Caught littering on the NSS Cyberiad", "Scientist involved in the ###### incident",
"Rescued four assistants from a plasma fire, but left behind the station blueprints",
"Successfully cremated a changeling without stripping them", "Worked at a zoo and got fired for eating a monkey", "None",
"Found loitering in front of the bridge", "Wired the engine directly to the power grid", "Known for getting wounded too easily",
"Demoted in the past for speaking as a mime", "THEY ARE AFTER ME, SEND HELP!",
"Ex-NT recruiter, fired for hiring a syndicate agent as an Chief Engineer", "Took the autolathe circuit board from the Tech Storage as Roboticist",
"Did not alert the crew about multiple toxins tests", "Built a medical bay in the Research Division as a Scientist",
"Connected a plasma storage tank to the air distribution line", "Certified supermatter taste tester",
"Is known to spend entire shifts in the arcade instead of working", "Experienced Cybersun Industries roboticist"]

const incorrect_species = ["Abductor", "Monkey", "Shadow", "Skeleton", "Golem", "Ancient Skeleton"]

const correct_species = ["Human", "Unathi", "Skrell", "Tajaran", "Kidan", "Drask", "Diona", "Machine", "Slime People", "Nian", "Vox"]

const species_age = {"Human":[85] , "Unathi":[85], "Skrell":[85], "Tajaran":[85], "Kidan":[85], "Drask":[500], "Diona":[300], "Machine":[60], "Slime People":[130], "Nian":[85], "Vox":[90]}

const human_first = ["abel","adolph","alan","alden","alex","alfred","alger","allen","amos","apple","archie","arnie","art",
  "arthur","baldric","bartholomew","bill","blake","brayden","brendan","brock","bronte","brick","bruce","bryce","buck","burt",
  "butch","byrne","byron","camryn","carl","carter","casimir","cassian","charles","charlton","chip","clark","claudius","clement","cleveland",
  "cliff","clinton","cletus","collin","crush","cy","damian","danny","darcey","darell","darin","deangelo","denholm","desmond","devin","dirk",
  "dominic","donny","driscoll","duke","duncan","edgar","eliot","eliott","elric","elwood","emmanuel","fenton","fitz","flick","flint","flip","francis",
  "frank","frankie","fridge","fulton","gannon","garret","gary","goddard","godwin","goodwin","gordon","graeme","gratian","grendel","han","harry","hartley",
  "harvey","henderson","holden","homer","horatio","huffie","hungry","hugo","irvine","jacob","jake","jamar","jamie","jamison","janel","jaydon","jaye","jayne",
  "jean-luc","jeb","jed","jemmy","jermaine","jerrie","jim","joachim","joey","johnathan","john","johnny","jonathon","josh","josiah","kennard","keziah","lando",
  "lanny","launce","leland","lennox","lenny","leonard","leroy","lief","linden","linton","lorde","loreto","lou","lucas","luke","malachi","malcolm","manley",
  "marion","max","maynard","melvyn","michael","mike","milton","montague","monte","monty","nat","nathaniel","nick","nikolas","noah","opie","osbert","osborn",
  "osborne","osmund","oswald","paget","patrick","patton","percival","persh","rastus","raymond","rayner","reuben","reynard","richard","rodger","roger","romayne",
  "roscoe","roswell","royce","rube","rusty","sal","sawyer","scotty","seymour","shane","shiloh","smoke","simon","sloan","sorrel","spike","sybil","syd","tamsin",
  "taylor","tel","terrell","tim","timothy","todd","trip","tye","uland","ulric","vaughn","vince","vinny","walter","ward","warner","wayne","whitaker","william",
  "willy","woodrow","zack","zane","zeke","jacob","michael","ethan","joshua","daniel","alexander","anthony","william","christopher","matthew","jayden","andrew",
  "joseph","david","noah","aiden","james","ryan","logan","john","nathan","elijah","christian","gabriel","benjamin","jonathan","tyler","samuel","nicholas","gavin",
  "dylan","jackson","brandon","caleb","mason","angel","isaac","evan","jack","kevin","jose","isaiah","luke","landon","justin","lucas","zachary","jordan","robert",
  "aaron","brayden","thomas","cameron","hunter","austin","adrian","connor","owen","aidan","jason","julian","wyatt","charles","luis","carter","juan","chase",
  "diego","jeremiah","brody","xavier","adam","carlos","sebastian","liam","hayden","nathaniel","henry","jesus","ian","tristan","bryan","sean","cole","alex",
  "eric","brian","jaden","carson","blake","ayden","cooper","dominic","brady","caden","josiah","kyle","colton","kaden","eli","miguel","antonio","parker",
  "steven","alejandro","riley","richard","timothy","devin","jesse","victor","jake","joel","colin","kaleb","bryce","levi","oliver","oscar","vincent","ashton",
  "cody","micah","preston","marcus","max","patrick","seth","jeremy","peyton","nolan","ivan","damian","maxwell","alan","kenneth","jonah","jorge","mark","giovanni",
  "eduardo","grant","collin","gage","omar","emmanuel","trevor","edward","ricardo","cristian","nicolas","kayden","george","jaxon","paul","braden","elias","andres",
  "derek","garrett","tanner","malachi","conner","fernando","cesar","javier","miles","jaiden","alexis","leonardo","santiago","francisco","cayden","shane","edwin",
  "hudson","travis","bryson","erick","jace","hector","josue","peter","jaylen","mario","manuel","abraham","grayson","damien","kaiden","spencer","stephen","edgar",
  "wesley","shawn","trenton","jared","jeffrey","landen","johnathan","bradley","braxton","ryder","camden","roman","asher","brendan","maddox","sergio","israel",
  "andy","lincoln","erik","donovan","raymond","avery","rylan","dalton","harrison","andre","martin","keegan","marco","jude","sawyer","dakota","leo","calvin",
  "kai","drake","troy","zion","clayton","roberto","zane","gregory","tucker","rafael","kingston","dominick","ezekiel","griffin","devon","drew","lukas","johnny",
  "ty","pedro","tyson","caiden","mateo","braylon","cash","aden","chance","taylor","marcos","maximus","ruben","emanuel","simon","corbin","brennan","dillon",
  "skyler","myles","xander","jaxson","dawson","kameron","kyler","axel","colby","jonas","joaquin","payton","brock","frank","enrique","quinn","emilio","malik",
  "grady","angelo","julio","derrick","raul","fabian","corey","gerardo","dante","ezra","armando","allen","theodore","gael","amir","zander","adan","maximilian",
  "randy","easton","dustin","luca","phillip","julius","charlie","ronald","jakob","cade","brett","trent","silas","keith","emiliano","trey","jalen","darius",
  "lane","jerry","jaime","scott","graham","weston","braydon","anderson","rodrigo","pablo","saul","danny","donald","elliot","brayan","dallas","lorenzo","casey",
  "mitchell","alberto","tristen","rowan","jayson","gustavo","aaden","amari","dean","braeden","declan","chris","ismael","dane","louis","arturo","brenden","felix",
  "jimmy","cohen","tony","holden","reid","abel","bennett","zackary","arthur","nehemiah","ricky","esteban","cruz","finn","mauricio","dennis","keaton","albert",
  "marvin","mathew","larry","moises","issac","philip","quentin","curtis","greyson","jameson","everett","jayce","darren","elliott","uriel","alfredo","hugo","alec",
  "jamari","marshall","walter","judah","jay","lance","beau","ali","landyn","yahir","phoenix","nickolas","kobe","bryant","maurice","russell","leland","colten",
  "reed","davis","joe","ernesto","desmond","kade","reece","morgan","ramon","rocco","orlando","ryker","brodie","paxton","jacoby","douglas","kristopher","gary",
  "lawrence","izaiah","solomon","nikolas","mekhi","justice","tate","jaydon","salvador","shaun","alvin","eddie","kane","davion","zachariah","damien","titus",
  "kellen","camron","isiah","javon","nasir","milo","johan","byron","jasper","jonathon","chad","marc","kelvin","chandler","sam","cory","deandre","river","reese",
  "roger","quinton","talon","romeo","franklin","noel","alijah","guillermo","gunner","damon","jadon","emerson","micheal","bruce","terry","kolton","melvin",
  "beckett","porter","august","brycen","dayton","jamarion","leonel","karson","zayden","keagan","carl","khalil","cristopher","nelson","braiden","moses","isaias",
  "roy","triston","walker","kale","aida","alexa","alexandria","alexis","alexus","alfreda","alisa","alisya","allegra","allegria","alma","alysha","alyssia",
  "amaryllis","ambrosine","angel","anjelica","anne","arabella","arielle","arleen","ashlie","astor","aubrey","avalona","averill","barbara","beckah","becky",
  "bernice","bethney","betsy","bidelia","breanne","brittani","brooke","cadence","calanthia","caleigh","candace","candice","carly","carlyle","carolyn","carry",
  "caryl","cecily","cherette","cheri","cherry","christa","christiana","christobelle","claribel","clover","coreen","corrine","cynthia","dalya","daniella","daria",
  "dayna","debbi","dee","deena","della","delma","denys","diamond","dina","dolores","donella","donna","dorothy","dortha","easter","ebba","effie","elizabeth",
  "elle","emma","ermintrude","esmeralda","eugenia","euphemia","eustace","eveleen","evelina","fay","floella","flora","flossie","fortune","genette","georgene",
  "geraldine","gervase","gina","ginger","gladwyn","glenna","greta","griselda","gwenda","gwenevere","hadley","haidee","hailey","hal","haleigh","hayley",
  "heather","hedley","helen","hepsie","hortensia","iantha","ileen","innocent","irene","jacaline","jacquetta","jacqui","jakki","jalen","janelle","janette",
  "janie","janina","janine","jasmine","jaylee","jaynie","jeanna","jeannie","jeannine","jenifer","jennie","jera","jere","jeri","jillian","jillie","joetta",
  "joi","joni","josepha","joye","julia","july","kaelea","kaleigh","karenza","karly","karyn","kat","kathy","katlyn","kayleigh","keegan","keira","keith","kellie",
  "kerena","kerensa","keturah","kimberley","lacy","lakeisha","lalla","latanya","laurencia","laurissa","leeann","leia","lessie","leta","lexia","lexus","lindsie",
  "lindy","lockie","lori","lorin","luanne","lucian","luvenia","lyndsey","lynn","lynsey","lynwood","mabelle","macey","madyson","maegan","marcia","mariabella",
  "marilene","marion","marje","marjory","marlowe","marlyn","marshall","maryann","maudie","maurene","may","merideth","merrilyn","meryl","minnie","monna","muriel",
  "mya","myriam","myrtie","nan","nelle","nena","nerissa","netta","nettie","nonie","nova","nowell","nydia","olive","oralie","patience","pauleen","pene",
  "peregrine","pheobe","phoebe","phyliss","phyllida","phyllis","porsche","prosper","prue","quanah","quiana","raelene","rain","randa","randal","rebeckah",
  "reene","renie","rexana","rhetta","ronnette","rosemary","rubye","sabella","sachie","sally","saranna","seneca","shana","shanika","shannah","shannon","shantae",
  "sharalyn","sharla","sheri","sherie","sherill","sherri","sissy","sophie","star","steph","stephany","sue","sukie","sunshine","susanna","susannah","suzan",
  "suzy","sydney","tamika","tania","tansy","tatyanna","tiffany","tolly","topaz","tori","tracee","tracey","ulyssa","valary","verna","vinnie","vivyan","wendi",
  "wisdom","wynonna","wynter","yasmin","yolanda","ysabel","zelda","zune","emma","isabella","emily","madison","ava","olivia","sophia","abigail","elizabeth",
  "chloe","samantha","addison","natalie","mia","alexis","alyssa","hannah","ashley","ella","sarah","grace","taylor","brianna","lily","hailey","anna","victoria",
  "kayla","lillian","lauren","kaylee","allison","savannah","nevaeh","gabriella","sofia","makayla","avery","riley","julia","leah","aubrey","jasmine","audrey",
  "katherine","morgan","brooklyn","destiny","sydney","alexa","kylie","brooke","kaitlyn","evelyn","layla","madeline","kimberly","zoe","jessica","peyton",
  "alexandra","claire","madelyn","maria","mackenzie","arianna","jocelyn","amelia","angelina","trinity","andrea","maya","valeria","sophie","rachel","vanessa",
  "aaliyah","mariah","gabrielle","katelyn","ariana","bailey","camila","jennifer","melanie","gianna","charlotte","paige","autumn","payton","faith","sara",
  "isabelle","caroline","isabel","mary","zoey","gracie","megan","haley","mya","michelle","molly","stephanie","nicole","jenna","natalia","sadie","jada",
  "serenity","lucy","ruby","eva","kennedy","rylee","jayla","naomi","rebecca","lydia","daniela","bella","keira","adriana","lilly","hayden","miley","katie",
  "jade","jordan","gabriela","amy","angela","melissa","valerie","giselle","diana","amanda","kate","laila","reagan","jordyn","kylee","danielle","briana",
  "marley","leslie","kendall","catherine","liliana","mckenzie","jacqueline","ashlyn","reese","marissa","london","juliana","shelby","cheyenne","angel",
  "daisy","makenzie","miranda","erin","amber","alana","ellie","breanna","ana","mikayla","summer","piper","adrianna","jillian","sierra","jayden","sienna",
  "alicia","lila","margaret","alivia","brooklynn","karen","violet","sabrina","stella","aniyah","annabelle","alexandria","kathryn","skylar","aliyah","delilah",
  "julianna","kelsey","khloe","carly","amaya","mariana","christina","alondra","tessa","eliana","bianca","jazmin","clara","vivian","josephine","delaney",
  "scarlett","elena","cadence","alexia","maggie","laura","nora","ariel","elise","nadia","mckenna","chelsea","lyla","alaina","jasmin","hope","leila",
  "caitlyn","cassidy","makenna","allie","izabella","eden","callie","haylee","caitlin","kendra","karina","kyra","kayleigh","addyson","kiara","jazmine",
  "karla","camryn","alina","lola","kyla","kelly","fatima","tiffany","kira","crystal","mallory","esmeralda","alejandra","eleanor","angelica","jayda","abby",
  "kara","veronica","carmen","jamie","ryleigh","valentina","allyson","dakota","kamryn","courtney","cecilia","madeleine","aniya","alison","esther","heaven",
  "aubree","lindsey","leilani","nina","melody","macy","ashlynn","joanna","cassandra","alayna","kaydence","madilyn","aurora","heidi","emerson","kimora","madalyn",
  "erica","josie","katelynn","guadalupe","harper","ivy","lexi","camille","savanna","dulce","daniella","lucia","emely","joselyn","kiley","kailey","miriam",
  "cynthia","rihanna","georgia","rylie","harmony","kiera","kyleigh","monica","bethany","kaylie","cameron","teagan","cora","brynn","ciara","genevieve","alice",
  "maddison","eliza","tatiana","jaelyn","erika","ximena","april","marely","julie","danica","presley","brielle","julissa","angie","iris","brenda","hazel","rose",
  "malia","shayla","fiona","phoebe","nayeli","paola","kaelyn","selena","audrina","rebekah","carolina","janiyah","michaela","penelope","janiya","anastasia",
  "adeline","ruth","sasha","denise","holly","madisyn","hanna","tatum","marlee","nataly","helen","janelle","lizbeth","serena","anya","jaslene","kaylin","jazlyn",
  "nancy","lindsay","desiree","hayley","itzel","imani","madelynn","asia","kadence","madyson","talia","jane","kayden","annie","amari","bridget","raegan","jadyn",
  "celeste","jimena","luna","yasmin","emilia","annika","estrella","sarai","lacey","ayla","alessandra","willow","nyla","dayana","lilah","lilliana","natasha",
  "hadley","harley","priscilla","claudia","allisson","baylee","brenna","brittany","skyler","fernanda","danna","melany","cali","lia","macie","lyric","logan",
  "gloria","lana","mylee","cindy","lilian","amira","anahi","alissa","anaya","lena","ainsley","sandra","noelle","marisol","meredith","kailyn","lesly","johanna",
  "diamond","evangeline","juliet","kathleen","meghan","paisley","athena","hailee","rosa","wendy","emilee","sage","alanna","elaina","cara","nia","paris","casey",
  "dana","emery","rowan","aubrie","kaitlin","jaden","kenzie","kiana","viviana","norah","lauryn","perla","amiyah","alyson","rachael","shannon","aileen","miracle",
  "lillie","danika","heather","kassidy","taryn","tori","francesca","kristen","amya","elle","kristina","cheyanne","haylie","patricia","anne","samara"]

const unathi_syllables = ["za","az","ze","ez","zi","iz","zo","oz","zu","uz","zs","sz","ha","ah","he","eh","hi","ih",
	"ho","oh","hu","uh","hs","sh","la","al","le","el","li","il","lo","ol","lu","ul","ls","sl","ka","ak","ke","ek",
	"ki","ik","ko","ok","ku","uk","ks","sk","sa","as","se","es","si","is","so","os","su","us","ss","ra","ar",
	"re","er","ri","ir","ro","or","ru","ur","rs","sr","aa","ae","ai","au","ao",
  "ea","ee","ei","eu","eo","ia","ie","ii","iu","io","oa","oe","oi","ou","oo","ua","ue","ui","uu","uo"]

const tajaran_syllables = ["rr","ta","ki","ra","mi","kr","ah","na","va","kh","jr","da","dy","ma","rh","za","ka","ch",
  "ee","th","dr","ju","sa","ii","aa","fa","wa","ba","ar","qa","zi","hr","nj","ri", "ha","ke","tu","cr","az"]

const vox_syllables = ["ti","hi","ki","ya","ta","ha","ka","ya","ch","ka"]

const dionae_first = ["to", "wind", "embrace", "dreams", "witnessing", "approaching", "glimmer", "the", "colors", "silence", "gentle", "glistening", "child", "blessed", "grass-walker", "element", "spawn"]

const ipc_first = ["pbu","hiu","sina","arma","osi","1-rover-1","7-zark-7","790","am","amee","astar","adaptive manipulator",
  "allied mastercomputer","alpha 5","alpha 6","alpha 7","amigobot","android","aniel","asimov","astor","b-4","b-9","b.o.b.","b166er",
  "bender","bishop","blitz","box","brackenridge","c-3po","cassandra one","cell","chii","chip","computer","conky 2000","cutie","data",
  "dee model","deep thought","dor-15","dorfl","dot matrix","duey","e.d.i.","ed-209","e-man","emma-2","erasmus","ez-27","friend computer",
  "fagor","faith","fi","frost","fum","futura","g2","george","gnut","gort","h.a.r.l.i.e.","h.e.l.p.er.","h.e.r.b.i.e.","hal 9000","hadaly",
  "huey","irona","jay-dub","jinx","johnny 5","k-9","kitt","klapaucius","kryten 2x4b-523p","l-76","l-ron","luh3417","louie","mark13","maria","marvin",
  "master control program","max 404","maximillian","mechagodzilla","mechani-kong","metalhead","mr. r.i.n.g.","nch","necron-99","norby","omm 0910",
  "orange v 3.5","pto","project 2501","r.i.c. 2.0","r2-d2","r4-p17","revelation","ro-man","robbie","s.a.m.","s.h.o.c.k.","s.h.r.o.u.d.","s.o.p.h.i.e.",
  "sen 5241","shodan","sid 6.7","setaur","shrike","solo","speedy","super 17","surgeon general kraken","t-1000","t-800","t-850","thx 1138","twa","terminus",
  "tidy","tik-tok","tobor","trurl","ultrabot","ulysses","uniblab","v.i.n.cent.","voltes v","w1k1","wikipedia","windows 3.1","x-5","xerxes","xr","yod",
  "z-1","z-2","z-3","zed","zord","mugsy3000","terminus","decimus","robot devil","optimus","megatron","soundwave","ironhide"]

const vulpkanin_first = ["abby","acantha","addilyn","adela","adele","aderyn","adley","adriana","aerona","aileen","alanis",
  "alberta","alex","alexandra","alice","alma","amalie","andromeda","angel","ann","anna","anne","annie","ariel","arya",
  "astraea","astrid","athena","audra","aura","aurora","avice","bailey","barbara","beatrix","belinda","bellatrix","belle",
  "bianca","braelynn","brea","bree","brooke","brunhilde","caitlin","callisto","camden","camilla","candra","carina",
  "carletta","carline","carman","caroline","carys","cassandra","cassiopeia","catlyn","celeste","celina","ceres","cerian",
  "charlotte","chelle","chloe","cicely","clara","clarice","claudia","cordelia","cornelia","cressida","cybele","dagmar",
  "daisy","dakota","daphne","daria","darla","dawn","deidra","deja","delilah","delphine","delyth","demetra","dezra","dinah",
  "dora","effie","eiddwen","elaine","elara","eleanor","eliana","elise","ellen","elsa","emilia","emily","emma","emmie","emmy",
  "ester","esther","eva","fadila","farren","fay","felita","felizia","fenella","fleur","francesca","freya","garnet","ginger",
  "grace","gracie","gwen","hadley","hafren","halley","hannah","harlyn","harmony","harper","hazel","helen","helena","helene","hilda",
  "holly","honey","hope","idonea","igna","imogen","ina","iona","irene","irma","isabel","isabella","ivy","jacqueline","jaelyn","jana",
  "janice","janis","jayene","jazzlyn","jeane","jennete","jennifer","jill","jo","johanna","joslyn","juliana","juliet","june","kaia","kali",
  "karlene","kathryn","kenna","kiera","kiley","kimberly","kivela","lacey","lachelle","lacy","larissa","laura","layla","lena","leonor","leslie",
  "lexi","liana","liani","lianne","liesel","lili","liliwen","lilly","linda","lola","lona","lorelai","lorelei","luise","lulu","luna","lycia",
  "lyn","mabyn","madeleine","maeve","magdalene","maggie","maia","maragaret","margarethe","mariah","mariam","marilyn","marina","marisole","marivel",
  "marley","marni","marrie","martina","mary","mazelina","meda","medea","mei","melania","melanie","melody","mercedes","merle","meryl","mia","michelle",
  "mila","millie","mindy","miranda","missy","misty","mona","morgan","morgana","morrigan","morticia","nadia","nadine","nessa","nia","nicole","nikki",
  "nimah","nina","norma","nova","olive","olivia","opaline","ophelia","oriana","paisley","paloma","pam","pauline","paz","penelope","penny","phoebe",
  "piper","portia","priya","rachel","raina","raura","raven","rayna","rayne","rebecca","regina","renee","rhea","rina","robin","rosalind","rosie",
  "rowen","rowena","royce","rubella","ruby","rue","ruth","sabrina","sadie","sahara","sandra","savina","sawyer","selene","sena",
  "seraphina","seraphine","sheba","sheila","sia","sibylle","sofie","sonnet","sophia","stacia","stacy","stefanie","stella","suri","syden","sylvia",
  "tala","tasha","tasia","tatum","taylee","teegan","teresa","tess","tessa","tessy","theia","titania","trisha","trixie","trudy","uma","ursula","valenia",
  "valentina","vega","vera","verena","vicky","victoria","willow","winnie","yasmin","yvette","yvonne","zia","zinnia","ziva","zoe","zuri","aaron","abe",
  "abraham","adelger","adolar","albuin","alexander","alhazred","amren","andre","andreas","aneurin","angelo","ansel","ares","armon","arnet","arric","ash",
  "aspen","atlas","august","axel","barald","barrett","basil","bastian","baxter","ben","benjamin","benny","berthold","blake","bo","bolgan","bosche","brutus",
  "buck","caden","cadog","caelum","calvin","camus","caradoc","carter","casey","caspar","castor","cayo","cedrik","chandler","charles","charlie","charon",
  "christian","claude","clayton","clifton","clive","clyde","colby","cole","colin","colton","conner","connor","conor","cooper","craig","curtis","dane","dannan",
  "deimos","dennis","derek","derion","derric","deryn","desmond","dietmar","dirge","dominic","don","draven","duane","duke","dunstan","dylan","eckhard","eckhart",
  "edgar","elfyn","emanuel","embry","emery","erik","ernst","ferdinand","finch","finn","flik","flint","florian","floyd","francis","franz","fynn","gaius",
  "garrett","garske","gary","gavin","gavner","gerome","gerrant","ghirahim","gillian","glen","gordon","gorudo","grant","griffin","grum","hal","hanklin",
  "harald","harley","hauser","heath","hector","heribert","hermes","hudson","hugo","hunter","hywel","ingolf","inigo","ioan","irving","isaac","isaak","ivaylo",
  "iver","jacob","jaime","jake","janik","jared","jarom","jarvald","jason","javier","jeremiah","jerome","jesse","jett","jim","jimba","jimmy","joe","jonah",
  "jones","joshua","josua","julian","kai","kaleb","kear","kenneth","kenway","kenyon","kevin","kirk","klaus","kodan","konrad","kortan","kurt","kyle","lance",
  "landon","larc","larry","lars","leander","lennard","leo","liam","linus","logan","loki","lope","lorenz","lou","louis","lovel","luc","lucas","luka","luke",
  "lykaon","magnus","maik","manuel","marc","marion","mariston","marlowe","marmon","marshall","martin","martyn","marvin","mason","matthias","maynord","meic",
  "melchior","meyer","micah","michael","mitchell","moe","mordecai","morten","mourgent","nathaniel","nero","nick","nicolas","niko","nils","noah","oberon",
  "ole","oscar","osiris","osmon","osther","otsoa","otto","parker","paul","pavel","perry","perseus","philip","philipp","pierce","porter","preston","quelii",
  "ralph","randall","randolf","ranulf","raoul","raul","reade","red","rhain","rhydian","rhydwyn","rhys","rico","rigel","rob","robin","rocky","roderic","roger",
  "roland","rolayne","roniston","ronnet","roscoe","roy","rudy","rukheim","rupert","russell","ryan","samuel","sawyer","scott","severin","shilo","silver",
  "silvester","sirius","slate","sol","sriscoll","stefan","stephen","sterling","steven","stone","sullivan","taylor","ted","teddy","terry","themis","theo",
  "theodore","thyrius","tibarn","tim","tizian","torben","torsten","trevor","trion","tristan","troy","trystan","turner","tybalt","tyr","ulbrecht","ulrick",
  "valentine","vallin","veit","velvel","vesper","victor","vincent","vinzenz","vuk","walter","wayne","weizen","will","william","wulfrun","xaver","yannik",
  "york","zac","zacharias","zeb","zegrath"]

const slime_first = ["anablop", "bloopella", "blopbela", "blopbelle", "bloppina", "bub", "bubbles", "bubblette", "bubbli", "bubblia", "bubbly", "fizzaria", 
  "fizzete", "fizzian", "fizzina", "fizzney", "fizzy", "flubbelyn", "flubbney", "flubbzina", "gelinda", "gelletina", "gellina", "gooenna", "gooescari", 
  "goolinda", "isabloppa", "jelibelle", "jellai", "jellei", "jellenna", "jellette", "jelli", "jellianne", "jellica", "jellina", "jelly", "jiggly", 
  "marmalade", "murkella", "murkina", "oozella", "oozerina", "oozina", "pipoppy", "pippop", "popiline", "popilla", "popparia", "poppaya", "poppella", 
  "poppet", "poppi", "poppla", "poppurina", "poppy", "skishella", "skishelly", "skishly", "skuishi", "skweesha", "skwishly", "slush", "slusharia", "slushi", 
  "slushia", "slushibell", "slushie", "slushy", "squisha","squishie","squishlee", "bloppella","blip","blobbert","blobbin","blobbo","blobby","bloop","bloopary",
  "bloopin","bloopy","blooui","blop","blopary","bloppard","bloppino","bloppy","blorb","blorble","blubb","blubble","blubby","blup","bluppary","blurbin",
  "blurbington","blurble","blurbo","blurby","bog","boggley","boggs","bop","bubblin","bubblinton","bubby","bubobu","driblet","elgen","fizzard","fizzmore",
  "fizzo","fizzrick","flan","gammy","gel","gelardo","gelert","geley","gellard","gellbert","gelly","gill","globbert","globbin","globblino","globbly","globbo",
  "globu","globule","globuli","gloob","gloobert","glooby","glooppins","gloopy","glopp","glorb","glorby","glorg","glu","glub","glubb","glubbert","glubble",
  "glubblee","gluen","glug","glugg","gluggen","gluggy","goo","goober","goobly","gooffy","goomie","goop","gooverl","grime","gumbo","gummi","jaeli","jammy",
  "jelert","jeley","jellard","jellardo","jellbert","jellberto","jelleno","jellert","jellimillian","jiggle","jolly","lime","mooze","muckey","muckle","muckus",
  "mucus","mucy","muk","murk","murkello","murkey","murkle","ooey","ooul","oouzen","oozellin","oozelus","oozeroth","oozeroy","oozey","oozi","oozinth","oozish",
  "oozuik","oozuish","oozy","pipop","pipoulp","plip","ploop","plop","plopp","plopponu","pop","popou","poppello","poppeth","poppilor","poppin","popplin","poulp",
  "pudd","pupp","shimmy","skwickey","slimedo","slimero","slimeton","slimey","sloosh","slop","slosh","sludge","slush","smidgen","smudge","sploth","spritz","squan",
  "squeshelon","squishan","squishard","squishary","squishen","squishendo","squishie","squiship","squishiro","squishu","squishul","squorsh","uoulp","uulpop",
  "wibble","wobble"]

const kidan_first = ["vrax", "krek", "krekk", "vriz", "zrik", "zarak", "click", "zerk", "drax", "zven", "drexx", "vrik", "vrek", "krax", "varak", "zavak", "vrexx", "drevk", "krik", "karak", "krexx", "zrax", "zrexx", "zrek", "verk", "drek", "drikk", "zvik", "vzik", "kviz", "vrizk", "vrizzk", "krix", "krixx", "zark", "xark", "xarkk", "xerx", "xarak", "karax", "varak", "vazak", "vazzak", "zirk", "krak", "xakk", "zakk", "vekk"]

const drask_first = ["hoorm","viisk","saar","mnoo","oumn","fmong","gnii","vrrm","oorm","dromnn","ssooumn","ovv", "hoorb","vaar","gaar","goom","ruum","rumum"]

const moth_first = ["abbot","archer","arkwright","baker","bard","biologist","broker","caller","chamberlain","clerk","cooper","culinarian","dean","director","duke","energizer","excavator","explorer","fletcher","gatekeeper","guardian","guide","healer","horner","keeper","knight","laidler","mapper","marshall","mechanic","miller","navigator","pilot","prior","seeker","seer","smith","stargazer","teacher","tech whisperer","tender","thatcher","voidcrafter","voidhunter","voidwalker","ward","watcher","weaver","webster","wright"]

const skrell_syllables = ["qr","xu","qi","qu","vo","xr","za","qo","zi","*q","!q","*x","!x","*z","!z", "**", "!!", "!*", "*!"]

function isGoodCanidate(species, planet, job, records, name, age, dob) {
  if(job === "Clown") {
    return true;
  }
  if(name === "Steve") {
    return true;
  }
  if(job === "Mime" & name === "...") {
    return true;
  }
  if(name === "Johnny Nanotrasen, Jr.") {
    return true;
  }
  if(name === "Owlman") {
    return true;
  }
  if(2568 - parseInt(dob.substring(dob.indexOf("/")+1)) != age) {
    return false
  }
  if(incorrect_planets.includes(planet)) {
    return false;
  }
  if(!correct_species.includes(species)) {
    return false;
  }
  if(!(age >= 17 && age <= species_age[species][0])) {
    return false;
  }
  if(incorrect_jobs.includes(job)) {
    return false;
  }
  if(incorrect_records.includes(records)) {
    return false;
  }
  if(checkName(species, name.toLowerCase()))
    return true;
}


function checkName(species, name) {
  let firstname = name.substring(0, name.indexOf(" "))

  if(species === "Vulpkanin") {
    return vulpkanin_first.includes(firstname);
  }
  if(species === "Slime People") {
    return slime_first.includes(firstname);
  }

  if(species === "Kidan") {
    if(kidan_first.includes(firstname)) {
      return true;
    }
    else if(kidan_first.includes(firstname.slice(0, -1))){
      return true
    } else {
      return kidan_first.includes(name)
    }
  }
  if(species === "Nian") {
    if(moth_first.includes(firstname)) {
      return true;
    } else {
      return moth_first.includes(firstname.slice(0, -1))
    }
  }
  if(species === "Diona") {
    return dionae_first.includes(firstname);
  }

  let firsttwo = name.substring(0, 2)
  if(species === "Skrell") {
    return skrell_syllables.includes(firsttwo);
  }
  if(species === "Tajaran") {
    return tajaran_syllables.includes(firsttwo);
  }
  if(species === "Unathi") {
    return unathi_syllables.includes(firsttwo);
  }
  if(species === "Vox") {
    return vox_syllables.includes(firsttwo);
  }

  let firstnamehyphen = name.substring(0, name.indexOf("-"))
  if(species === "Drask") {
    return drask_first.includes(firstnamehyphen);
  }
  if(species === "Machine") {
    if(ipc_first.includes(firstnamehyphen)) {
      return true;
    } else if(ipc_first.includes(name)) {
      return true;
    }
    return false;
  }

  if(species === "Human") {
    return human_first.includes(firstname);
  }
  return false;
}

export const NTRecruiter = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    gamestatus,
    cand_name,
    cand_birth,
    cand_age,
    cand_species,
    cand_planet,
    cand_job,
    cand_records,
    cand_curriculum,
    total_curriculums,
    reason,
  } = data;
  if (gamestatus === 0) {
    return (
      <Window width={400} height={550}>
        <Window.Content>
          <Stack fill vertical>
            <Stack.Item grow>
              <Section fill>
                <Stack.Item pt="45%" fontSize="31px" color="white" textAlign="center" bold>
                  Nanotrasen Recruiter Simulator
                </Stack.Item>
                <Stack.Item pt="1%" fontSize="16px" textAlign="center" color="label">
                  Work as the Nanotrasen recruiter and avoid hiring incompetent employees!
                </Stack.Item>
              </Section>
            </Stack.Item>
            <Section>
              <Button
                textAlign="center"
                lineHeight={2}
                fluid
                icon="play"
                color="green"
                content="Begin Shift"
                onClick={() => act('start_game')}
              />
              <Button
                textAlign="center"
                lineHeight={2}
                fluid
                icon="info"
                color="blue"
                content="Guide"
                onClick={() => act('instructions')}
              />
            </Section>
          </Stack>
        </Window.Content>
      </Window>
    );
  }
  if (gamestatus === 1) {
    return (
      <Window width={400} height={550}>
        <Window.Content>
          <Stack fill vertical>
            <Section
              fill
              color="grey"
              title="Guide"
              buttons={<Button icon="arrow-left" content="Main Menu" onClick={() => act('back_to_menu')} />}
            >
              <LabeledList>
                <LabeledList.Item label="1#" color="silver">
                  To win this game you must hire/dismiss <b>{total_curriculums}</b> candidates, one wrongly made choice
                  leads to a game over.
                </LabeledList.Item>
                <LabeledList.Item label="2#" color="silver">
                  Make the right choice by truly putting yourself into the skin of a recruiter working for Nanotrasen!
                </LabeledList.Item>
                <LabeledList.Item label="3#" color="silver">
                  <b>Unique</b> characters may appear, pay attention to them!
                </LabeledList.Item>
                <LabeledList.Item label="4#" color="silver">
                  Make sure to pay attention to details like age, planet names, the requested job and even the species
                  of the candidate!
                </LabeledList.Item>
                <LabeledList.Item label="5#" color="silver">
                  Not every employment record is good, remember to make your choice based on the <b>company morals</b>!
                </LabeledList.Item>
                <LabeledList.Item label="6#" color="silver">
                  The planet of origin has no restriction on the species of the candidate, don&apos;t think too much
                  when you see humans that came from Boron!
                </LabeledList.Item>
                <LabeledList.Item label="7#" color="silver">
                  Pay attention to <b>typos</b> and <b>missing words</b>, these do make for bad applications!
                </LabeledList.Item>
                <LabeledList.Item label="8#" color="silver">
                  Remember, you are recruiting people to work at one of the many NT stations, so no hiring for{' '}
                  <b>jobs</b> that they <b>don&apos;t offer</b>!
                </LabeledList.Item>
                <LabeledList.Item label="9#" color="silver">
                  Keep your eyes open for incompatible <b>naming schemes</b>, no company wants a Vox named Joe!
                </LabeledList.Item>
                <LabeledList.Item label="10#" color="silver">
                  For some unknown reason <b>clowns</b> are never denied by the company, no matter what.
                </LabeledList.Item>
              </LabeledList>
            </Section>
          </Stack>
        </Window.Content>
      </Window>
    );
  }
  if (gamestatus === 2) {
    return (
      <Window width={400} height={550}>
        <Window.Content>
          <Stack fill vertical>
            <Stack.Item grow>
              <Section fill scrollable color="label" fontSize="14px" title="Employment Applications">
                <Box fontSize="24px" textAlign="center" color="silver" bold>
                  Candidate Number #{cand_curriculum}
                </Box>
                <br />
                <LabeledList>
                  <LabeledList.Item label="Name" color="silver">
                    <b>{cand_name}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Species" color="silver">
                    <b>{cand_species}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Age" color="silver">
                    <b>{cand_age}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Date of Birth" color="silver">
                    <b>{cand_birth}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Planet of Origin" color="silver">
                    <b>{cand_planet}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Requested Job" color="silver">
                    <b>{cand_job}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Employment Records" color="silver">
                    <b>{cand_records}</b>
                  </LabeledList.Item>
                  <LabeledList.Item label="Employment Records" color={kidan_first.includes(cand_name.toLowerCase().substring(0, cand_name.indexOf(" "))) ? "green" : "red"}>
                    <b>{cand_name.substring(0, 2)}</b>
                  </LabeledList.Item>
                </LabeledList>
              </Section>
            </Stack.Item>
            <Stack.Item>
              <Section fill title="Stamp the application!" color="grey" textAlign="center">
                <Stack>
                  {!isGoodCanidate(cand_species, cand_planet, cand_job, cand_records, cand_name, cand_age, cand_birth) ? (
                  <Stack.Item grow basis={0}>
                    <Button
                      fluid
                      color="red"
                      content="Dismiss"
                      disabled={isGoodCanidate(cand_species, cand_planet, cand_job, cand_records, cand_name, cand_age, cand_birth)}
                      fontSize="150%"
                      icon="ban"
                      lineHeight={4.5}
                      onClick={() => act('dismiss')}
                    />
                  </Stack.Item>
                  ) : (
                  <Stack.Item grow basis={0}>
                    <Button
                      fluid
                      color="green"
                      content="Hire"
                      disabled={!isGoodCanidate(cand_species, cand_planet, cand_job, cand_records, cand_name, cand_age, cand_birth)}
                      fontSize="150%"
                      icon="arrow-circle-up"
                      lineHeight={4.5}
                      onClick={() => act('hire')}
                    />
                  </Stack.Item>
                  )}
                </Stack>
              </Section>
            </Stack.Item>
          </Stack>
        </Window.Content>
      </Window>
    );
  }
  if (gamestatus === 3) {
    return (
      <Window width={400} height={550}>
        <Window.Content>
          <Stack fill vertical>
            <Stack.Item grow>
              <Section pt="40%" fill>
                <Stack.Item bold color="red" fontSize="50px" textAlign="center">
                  {'Game Over'}
                </Stack.Item>
                <Stack.Item fontSize="15px" color="label" textAlign="center">
                  {reason}
                </Stack.Item>
                <Stack.Item color="blue" fontSize="20px" textAlign="center" pt="10px">
                  FINAL SCORE: {cand_curriculum - 1}/{total_curriculums}
                </Stack.Item>
              </Section>
            </Stack.Item>
            <Section>
              <Button lineHeight={4} fluid icon="arrow-left" content="Main Menu" onClick={() => act('back_to_menu')} />
            </Section>
          </Stack>
        </Window.Content>
      </Window>
    );
  }
};
