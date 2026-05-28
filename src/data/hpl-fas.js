// Auto-generated file. Do not edit manually.

const hplFas = [
  {
    title: "BMS Low Memory",
    description: "A software error is present.",
    content:
      "[ul] [li]The PCS Main board is running out of on-board storage.[/li] [li]Reset\n            Control Power on the rack.[/li] [li]If warning does not clear, replace the PCA\n            board.[/li] [/ul]",
    type: "warning",
  },
  {
    title: "CAN0 Error",
    description: "",
    content:
      "[ul] [li]Likely caused by issues in wiring harness between Battery Modules and\n            BMS. [ol] [li]Use [code]bms watch[/code] script and look for which modules are reporting\n            voltages.[/li] [li]Verify wiring harness connections between Battery Modules and\n            BMS.[/li] [/ol] [/li] [li]Possible problem with circuit board in Power Chassis. [div]If\n            [code]bms watch[/code] reports no voltages and there are no issues with wire harness\n            connections between Module 1 and Module 6 and the BMS, then replace Power Chassis.[/div]\n            [/li] [li]Possible problem with Battery Module circuit board. [div]If [code]bms\n            watch[/code] finds a [em]bad section[/em] and if no problems found with wiring harnesses\n            between Battery Modules, replace the battery module that is the first one showing no\n            voltages on the [code]bms watch[/code] script. [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/div] [/li] [/ul]",
    type: "warning",
  },
  {
    title: "CAN1 Error",
    description: "",
    content:
      "[ul] [li]Verify that the CAN resistor is in the proper location (only on Rack 1\n            and Rack N of a multiple Rack system, or only Rack 1 of a single-rack system). [div]If\n            more resistors are present, remove them so that only on cabinet #1 and the last\n            cabinet.[/div] [/li] [li]Using a Multimeter, verify the resistance across pins 19 and 20\n            on the HPL cabinets. Resistance measurement should be about 60ohms. [div]If resistance\n            is about 120ohms, it means that there is a break in the wiring.[/div] [div]Verify the\n            CAN wiring between each rack (Terminal Block pins 19 and 20 on HPL).[/div] [/li]\n            [li]Verify that they are using the recommended Belden Twisted Pair wiring for CAN\n            communication.[/li] [/ul]",
    type: "warning",
  },
  {
    title: "Calibration Reqd",
    description: "Do not operate the unit until Calibration procedure has been completed.",
    content:
      "[ol] [li]Run [code]field_cfg[/code] program to calibrate the HPL cabinet.[/li]\n            [li]If [code]field_cfg[/code] does not work, try and run a second time.[/li] [li]If\n            alarm is still present after running [code]field_cfg[/code] twice, download log files\n            and contact Tech Support.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "Cell Over Voltage",
    description: "One or more cells above maximum cell voltage.",
    content:
      "[h4]Warning at ]4.17V/cell[/h4] [div]The warning starts a five-second timer. If\n            the alarm clears, the timer and the alarm are both reset.[/div] [h4]Battery Module\n            reporting a wrong battery voltage[/h4] [ol] [li]Run [code]bms watch[/code].[/li] [li]If\n            no bad cell voltages found, download the logs and contact Tech Support.[/li] [li]If bad\n            battery voltage is found: [ol] [li]Order external Lithium Battery Charger.[/li]\n            [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "warning",
  },
  {
    title: "Cell Under Voltage",
    description: "",
    content:
      "[h4]Warning at &lt;2.7V/cell[/h4] [div]If the warning is active for more than\n            15s,\n            this turns to a fault and the HPL is removed from the DC bus.[/div] [h4]Battery Module\n            reporting a wrong battery voltage[/h4] [ol] [li]Run [code]bms watch[/code].[/li] [li]If\n            a very different battery voltage is found: [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "warning",
  },
  {
    title: "Charge Over Current",
    description: "",
    content:
      "[div]Warning is issued when the current exceeds 150A.[/div] [div]A 15s timer is\n            started. If the current goes below 150A, the warning will clear and the timer will\n            reset.[/div]",
    type: "warning",
  },
  {
    title: "Charge Voltage Low",
    description:
      "The state of charge is less than the target state of charge (related to voltage) for\n            60min with the battery modules NOT being charged.",
    content:
      "[ol] [li]Check the DC Bus from UPS with a multimeter to verify that the UPS is\n            providing proper DC Voltage to the HPL batteries.[/li] [li]If DC Bus is actually reading\n            low, verify the UPS settings in TKO. [div]Calibrate the UPS DC Output against a\n            multimeter by adjusting the DC Bus Voltage parameters for float voltage.[/div] [/li]\n            [li]If the DC Bus is actually reading the correct value on the meter, run\n            [code]field_cfg[/code] on the cabinet with the warning.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "Confirmation Required",
    description: "",
    content:
      "[div]A message is shown on the display after pressing a button only once.[/div]\n            [div]To clear the message, press the button again.[/div] [div]If the message does not\n            clear, wiggle the wire harness on the back of the button and see if the message goes\n            away. If this message is cleared this way, replace the button/harness assembly.[/div]",
    type: "warning",
  },
  {
    title: "Dischrg Over Current",
    description: "Warning at or above 150A.",
    content:
      "[div]At warning, a 15s timer is started.[/div] [div]Reduce the load, or verify the\n            status of the other battery cabinets in string. Below are some possible issues: [ol]\n            [li]Extreme cable length differences between the cabinets and the UPS.[/li]\n            [li]Under-performing HPL battery modules.[/li] [ol] [/div]",
    type: "warning",
  },
  {
    title: "Disconnect Requested",
    description: "",
    content: "[div]Possible field wiring issue: [ul] [li]CTB-1 and CTB-2[/li] [li]CTB-10 and\n            CTB-18[/li] [/ul] [/div]",
    type: "warning",
  },
  {
    title: "Door Open",
    description: "Warning when the door is open.",
    content:
      "[ol] [li]If alarm present when door is closed, check the alignment of the door\n            sensor.[/li] [li]If the door sensor is aligned, use a magnet to see if the door sensor\n            is functional.[/li] [li]If magnet does not fix the issue, replace the door sensor.[/li]\n            [/ol]",
    type: "warning",
  },
  {
    title: "End of Discharge",
    description: "Warning issued 30s BEFORE end of discharge.",
    content: "[div]Stop the discharge to remove the warning.[/div]",
    type: "warning",
  },
  {
    title: "High DC Bus Voltage",
    description: "Warning issued at 547VDC or higher.",
    content:
      "[ol] [li]Verify the DC bus voltage using a multimeter.[/li] [li]If voltage on door\n            display does not match multimeter, adjust UPS Charger Output Voltage down 2VDC and see\n            if HPL adjusts down.[/li] [li]Run [code]field_cfg[/code].[/li] [li]If issue persists,\n            upgrade firmware to latest version.[/li] [li]If issue persists after firmware upgrade,\n            replace PCA.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "High Delta Voltage",
    description:
      "Warning if one HPL rack is 10VDC or higher difference between Battery Cabinets.\n            [div]HPL cabinets will not join the bus until all cabinets are within 10VDC of each\n            other.[/div] [div]Cabinet with lowest VDC will join bus first.[/div]",
    content:
      "[div]If troubleshooting, and it is believed that the cabinet is refusing to come\n            online, and the State of Charge on the cabinet in question is not coming online, press\n            and hold the [em]Enable[/em] button for 5s to override the logic and bring the cabinet\n            online.[/div] [h4]For System Connected to EXM UPS[/h4] [div]If this message is seen on a\n            system connected to an EXM UPS, ensure that each HPL cabinet is configured with the\n            [code]enable_exm -y[/code] command. [ol] [li]Login to the HPL and get to the [em]$[/em]\n            prompt.[/li] [li]Type [code]enable_exm -y[/code] and press Enter. [div]When successful,\n            the message [em]HPL/EXM Operation is Enabled[/em] will show on the computer connected to\n            the system.[/div] [/li] [li]At the [em]$[/em] prompt, type [code]bms start[/code] and\n            press Enter.[/li] [li]Repeat these steps for all cabinets in the system.[/li] [/ol]\n            [/div] [h4]For System Connected to Series 600/610 UPS[/h4] [div]If this message is seen\n            on a system connected to an Series 600/610 UPS, ensure that each HPL cabinet is\n            configured with the [code]enable_s610 -y[/code] command. [ol] [li]Login to the HPL and\n            get to the [em]$[/em] prompt.[/li] [li]Type [code]enable_s610 -y[/code] and press Enter.\n            [div]When successful, the message [em]HPL/S610 Operation is Enabled[/em] will show on\n            the computer connected to the system.[/div] [/li] [li]At the [em]$[/em] prompt, type\n            [code]bms start[/code] and press Enter.[/li] [li]Repeat these steps for all cabinets in\n            the system.[/li] [/ol] [/div]",
    type: "warning",
  },
  {
    title: "High SOC",
    description: "SOC gets above 99.9%.",
    content:
      "[ol] [li]If voltage does not match multimeter, adjust UPS Charger Output Voltage\n            down 2VDC and see if HPL adjusts down.[/li] [li]Run [code]field_cfg[/code].[/li] [li]If\n            issue persists, upgrade firmware to latest version.[/li] [li]If issue persists after\n            firmware upgrade, replace PCA.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "IOB Frame Error",
    description: 'Input/Output Board (IOB) SPI bus communication frame error. [span\n            class="critical"]Warning after 1[/span]',
    content:
      "[ol] [li]Run [code]field_cfg[/code].[/li] [li]If issue persists, upgrade firmware\n            to latest version.[/li] [li]If issue persists after firmware upgrade, replace PCA.[/li]\n            [/ol]",
    type: "warning",
  },
  {
    title: "Loopback Fault",
    description:
      "Loopback Fault is caused by a broken signal connection between the Power Chassis and\n            the Battery Modules. If this condition remains a warning for more than 30 seconds, it\n            becomes a fault. [div] [h4]The Loop that the Loopback Fault refers to[/h4] [/div] [div]\n            The BMS board puts out an up/down pattern on pin 6 and it wants to see the same pattern\n            coming in on pin 5. Each MBB gets this up/down pattern at its FLT_IN pin and repeats it\n            out on its FLT_OUT pin, except if it detects something faulty or it is not working.\n            [/div]",
    content:
      '[div] The Loopback fault should disappear when the loop is forced to exist using a jumper wire or a DMM in ammeter mode. The CAN0 error will appear after a delay when a connector is unplugged. This error can be ignored. [/div][div] If the Loopback fault does not go away when each step is executed and the probes were verified to be on the right pins, then the component above the probes (PCA or battery shelf) is suspected to be faulty. [/div][div] Battery shelf being faulty could mean that the wire harness is faulty or an MBB (board in battery) is faulty. If PCA is faulty, it means the BMS board 700712G1 is faulty since this is the only thing in the PCA that touches the loop. [/div][ol][li]Check PCA by probing BATT header pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 6 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 5 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 4 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 3 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 2 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][/ol][div class="quick-box"][div class="label"]Illustrations:[/div][div class="icon-index"][div][span class="ref-modal"]Battery Monitoring and Balance Boards (MBB)[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/79c8fdc8-a4c4-409a-a633-0f547de48b9f/b3452201.png" /][/div][/div][div][span class="ref-modal"]BATT Header on PCA - Looking at PCA[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/785f8887-5135-4852-9516-960498944b2a/b3452202.png" /][/div][/div][div][span class="ref-modal"]Probing BATT Header Pins with Jumper Wire[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/06b8808b-b8d3-4640-b03a-1d8b2d429628/b3452203.png" /][/div][/div][div][span class="ref-modal"]Probing Wire-to-Wire Connector Pins with Jumper Wire[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/d1c6bd01-627e-4fe8-a949-3e681575cd67/b3452204.png" /][/div][/div][div][span class="ref-modal"]Plug Illustrations[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/b40a21e0-5b12-4f39-bdc7-76055a0902e9/b3452205.png" /][/div][/div][div][span class="ref-modal"]RCPT Illustrations[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/a10e78a9-fb68-49f2-87e9-3d99d06a9b02/b3452206.png" /][/div][/div][div][span class="ref-modal"]Wire Harness 565119 (Inter-Module Wire Harness Layout)[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/8adc3473-58df-4a92-a211-ca467e176e29/b3452207.png" /][/div][/div][/div][/div]',
    type: "warning",
  },
  {
    title: "Low Battery",
    description: "Warning at 410VDC or below.",
    content: "[ul] [li]See section 5.3.2 - Automatic Power off in HPL manual.[/li] [li]Recharge\n            the batteries.[/li] [/ul]",
    type: "warning",
  },
  {
    title: "Low Bus Voltage",
    description: "Warning when DC Bus is at 395VDC or below.",
    content:
      "[ol] [li]Perform troubleshooting on the UPS to identify why the DC Bus voltage is\n            low.[/li] [li]If UPS shows correct voltage but the HPL is reading low (using a\n            multimeter), run [code]field_cfg[/code].[/li] [li]If issue persists, upgrade firmware to\n            latest version.[/li] [li]If issue persists after firmware upgrade, replace PCA.[/li]\n            [/ol]",
    type: "warning",
  },
  {
    title: "Module Comms Error",
    description: "",
    content:
      "[ul] [li]Likely caused by issues in wiring harness between Battery Modules and\n            BMS. [ol] [li]Use [code]bms watch[/code] script and look for which modules are reporting\n            voltages.[/li] [li]Verify wiring harness connections between Battery Modules and\n            BMS[/li] [/ol] [/li] [li]Possible problem with circuit board in Power Chassis. [div]If\n            [code]bms watch[/code] reports no voltages and there are no issues with wire harness\n            connections between Module 1 and Module 6 and the BMS, then replace Power Chassis.[/div]\n            [/li] [li]Possible problem with Battery Module circuit board. [div]If [code]bms\n            watch[/code] finds a [em]bad section[/em] and if no problems found with wiring harnesses\n            between Battery Modules, replace the battery module that is the first one showing no\n            voltages on the [code]bms watch[/code] script. [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/div] [/li] [/ul]",
    type: "warning",
  },
  {
    title: "MBB Volt/Temp Delta",
    description: "",
    content:
      "[ol] [li]Order external Lithium Battery Charger to have onsite.[/li] [li]If SOC is\n            below 20%, recharge the batteries. [div]Refer to Section 5.3.2 – Automatic Power Off in\n            HPL Manual for instructions on recharge.[/div] [/li] [li]If SOC is above 20%, call Tech\n            Support for assistance in troubleshooting.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "Over Temp",
    description: "Warning appears when temperature is above 139°F (60°C).",
    content:
      "[div]The warning sometimes appears near the end of a long, high-load discharge,\n            and will go away on its own after the discharge. This is normal.[/div] [div]If the\n            operating temperature range was in the acceptable range at the beginning of the\n            discharge, then the logs (specifically the cell voltage log) should be analyzed by Tech\n            Support to determine if there is an under-performing battery module that needs to be\n            replaced.[/div]",
    type: "warning",
  },
  {
    title: "Over Voltage",
    description: "Warning appears when voltage is above 547V.",
    content:
      "[ol] [li]Using a multimeter, check the DC Bus.[/li] [li]If HPL is showing higher\n            voltage than meter: [ol] [li]Run [code]field_cfg[/code].[/li] [li]If the HPL is still\n            showing higher voltage than meter after running [code]field_cfg[/code], reprogram SD\n            card with latest firmware.[/li] [li]If the HPL is still showing higher voltage than\n            meter, replace Power Chassis.[/li] [ol] [/li] [li]If the HPL DC measurement matches the\n            multimeter value, then check UPS settings and adjust as necessary to get the DC Bus to\n            match the meter reading.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "Overload Possible",
    description: "",
    content:
      "[div]The HPLs are programmed with an [em]expected load[/em] in kWb. Multiple HPLs\n            that are wired to communicate with each other will add their expected loads together and\n            then divide the sum by the number of HPLs currently enabled/online.[/div] [div]If this\n            number ever exceeds the rated power delivery of one (1) HPL cabinet, the [em]Overload\n            Possible[/em] warning appears. It means that if the UPS goes to battery, the HPLs may\n            cut off before the normal EOD voltage is reached due to overload at the HPLs.[/div]\n            [div]This warning is typically seen during startup and not all parallel HPLs have been\n            placed online yet. It will disappear when all the HPLs are brought online.[/div]",
    type: "warning",
  },
  {
    title: "Pwr Supp Redund Loss",
    description: "Redundant control power supply has failed.",
    content: "[ol] [li]Run [code]field_cfg[/code].[/li] [li]Replace Power Chassis.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "Service Mode",
    description: "",
    content: "Key is in [em]Service[/em] position.",
    type: "warning",
  },
  {
    title: "Temp Above Discharge",
    description: "",
    content:
      "Temperature is above 99°F and battery performance could be reduced if a discharge\n            was started while the batteries are this warm. [div][strong]Note:[/strong] This is only\n            present in firmware V1.0.4 or older.[/div]",
    type: "warning",
  },
  {
    title: "Under Voltage",
    description: "Warning appears when voltage is below 410V.",
    content:
      "[ol] [li]Using a multimeter, check the DC voltage. [div]Refer to the Force Online\n            section of the Operations Guide.[/div] [/li] [li]If HPL is showing a different voltage\n            from the meter: [ol] [li]Run [code]field_cfg[/code].[/li] [li]If the HPL is still\n            showing different voltage than meter after running [code]field_cfg[/code], reprogram SD\n            card with latest firmware.[/li] [li]If the HPL is still showing different voltage than\n            meter, replace Power Chassis.[/li] [ol] [/li] [li]If the HPL DC measurement matches the\n            multimeter value, then check UPS settings and adjust as necessary to get the DC Bus to\n            match the meter reading.[/li] [/ol]",
    type: "warning",
  },
  {
    title: "Unauth USB Drive",
    description: "A USB is inserted into the PCA Chassis that is not formatted as FAT32.",
    content: "",
    type: "warning",
  },
  {
    title: "UPS Comm Error",
    description: "UPS Comms Lost over CAN bus.",
    content:
      "[ol] [li]Verify CAN connections.[/li] [li]Verify CAN termination resistor\n            installation.[/li] [li]Verify resistor value at HPL terminal block 19-20 (when control\n            power is off). [div]Value should be 60Ω: (2) 120Ω resistors in parallel should be\n            installed.[/div] [/li] [/ol] [div][strong]Note:[/strong] This only applies to systems\n            connected to Trinergy Cube or APM2.[/div]",
    type: "warning",
  },
  {
    title: "BMS Low Memory",
    description: "A software error is present.",
    content:
      "[ol] [li]Running out of onboard storage space for PCA main board (Verify with\n            Firmware Team before posting).[/li] [li]Reset Control Power on the rack.[/li] [li]If the\n            warning does not clear, replace the SD card.[/li] [li]After replacing the SD card and\n            the error still does not clear, replace the BMS board in PCA. [ul] [li]To replace the\n            BMS board, PCA, SD card, or Battery Module, it is necessary to run through the\n            [code]field_cfg[/code] process to allow the system to readdress all of the equipment\n            installed.[/li] [/ul] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Calibration Reqd",
    description: "Do not operate the unit until the calibration procedure has been completed.",
    content:
      "[ol] [li]Run [em]calibrate[/em] program to calibrate the HPL cabinet. All other\n            HPL cabinets should be offline when running this program.[/li] [li]If calibration does\n            not work, try and run a second time.[/li] [li]If calibration process fails, download the\n            logs and contact Tech Support.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "CAN0 Sync Loss",
    description: "",
    content:
      "[ol] [li]Warning becomes a fault when active after 90s.[/li] [li]Likely caused by\n            issues in wiring harness between the battery modules and BMS. [ol] [li]Use [code]bms\n            watch[/code] script and look for which modules are reporting voltages.[/li] [li]Verify\n            wiring harness connections betweenthe battery modules and BMS.[/li] [/ol] [/li]\n            [li]Possible problem with circuit board in Power Chassis. [div]If [code]bms watch[/code]\n            reports no voltages and there are no issues with wire harness connections between Module\n            1 and Module 6 and the BMS, then replace Power Chassis.[/div] [/li] [li]Possible problem\n            with Battery Module circuit board. [div]If [code]bms watch[/code] finds a [em]bad\n            section[/em] and if no problems found with wiring harnesses between Battery Modules,\n            replace the battery module that is the first one showing no voltages on the [code]bms\n            watch[/code] script. [ol] [li]Order external Lithium Battery Charger.[/li] [li]Replace\n            the Battery Module.[/li] [/ol] [/div] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Cell Over Voltage",
    description: "One (1) or more cells above maximum cell voltage",
    content:
      "[ol] [li]Warning at above 4.17V/cell. [ol] [li]Warning starts a 5-second\n            timer.[/li] [li]If condition clears, then timer is reset and warning resets.[/li] [/ol]\n            [/li] [li]Battery module is reporting a wrong battery voltage. [ol] [li]Using a DMM,\n            verify the voltage on the DC Bus with the HMI on the UPS and the HMI on the HPL with the\n            warning.[/li] [li]If the HPL is reading higher than the UPS and multimeter, run the\n            [em]calibrate[/em] program from HyperTerminal/PuTTY.[/li] [li]If the UPS is producing a\n            higher voltage than what is recommended, adjust the UPS settings to match the\n            recommended HPL float voltage (See HPL UPS Settings in TKO). [div]If the UPS is\n            producing a higher voltage, leave the HPL control power on (HPL removed from the DC Bus)\n            and wait for about an hour, so that the HPL voltage drops below the float voltage.[/div]\n            [/li] [li]Run [em]bms watch[/em].[/li] [li]If no bad cell voltages are found (cells\n            above 4.17V), copy logs and contact Tech Support.[/li] [li]If high cell voltage was\n            found, leave HPL control power on, with HPL off the DC bus, for at least one (1) hour to\n            allow HPL voltage to drop below float voltage. [/li] [li]If fault recurs after all above\n            troubleshooting has occurred. [ol] [li]Order load bank (BK Precision 8514 from\n            TRESCAL)[/li] [li]Replace the battery module[/li] [/ol] [/li] [/ol] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Cell Under Voltage",
    description: "",
    content:
      "[ol] [li]Warning at below 2.7V/Cell [div]If warning is active for more than 15\n            seconds, then it changes to fault and removes the HPL from the DC Bus.[/div] [/li]\n            [li]Run BMS Watch to see if one (1) battery has very different battery cell voltage.\n            [div] [ol] [li]If all cells in a single battery are low, but above 2.5V, order the\n            external lithium battery charger, from TRESCAL, and recharge the battery using the\n            recharge procedure in TKO. [/li] [li]If entire cabinet is low, use a DMM to verify the\n            DC Bus Voltage on the UPS is outputting the correct voltage, [div]If UPS is producing\n            low voltage:[/div] [ul] [li]Verify UPS Battery Settings.[/li] [li]Troubleshoot the UPS\n            Charger.[/li] [/ul] [/div] [/li] [li]If an extremely low cell is found (i.e. 0.2V or\n            more lower than the others), or if any cell has been under 2.5V/cell for three (3) days\n            or more. [div] [ul] [li]Order external lithium battery charger.[/li] [li]Replace battery\n            module.[/li] [/ul] [/div] [/li] [/ol] [/div] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Charge Over Current",
    description: "",
    content:
      "[ol] [li]Warning when current meets or exceeds 150A. [div] [ol] [li]Starts a\n            15-second timer.[/li] [li]If the condition goes below 150A, warning will clear and timer\n            will reset.[/li] [/ol] [/div] [/li] [li]Verify the UPS charger current limit\n            settings.[/li] [li]When trying to start a single HPL with multiple other cabinets\n            online, perform the following: [div] [ol] [li]Verify with the customer that it is able\n            to remove some of the other HPLs from the DC Bus, and let the UPS charge just the low\n            cabinet, and then bring the rest of the HPLs online.[/li] [li]Try and lower the UPS\n            Charge Current Limit temporarily to charge the HPL more slowly.[/li] [li]Troubleshoot\n            the UPS Charger.[/li] [/ol] [/div] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Charge Voltage Low",
    description: "",
    content:
      "[ol] [li]State of Charge is less than the Target State of Charge (related to\n            voltage) for 60 minutes with the battery modules NOT being charged.[/li] [li]Check DC\n            Bus from UPS with a multimeter to verify that the UPS is outputting the proper DC\n            Voltage to the HPL batteries.[/li] [li]If DC Bus is reading low, verify the UPS settings\n            in TKO. [div] [ol] [li]Calibrate UPS DC Output against a multimeter by adjusting the DC\n            Bus Voltage parameters for float voltage.[/li] [li]If UPS bus voltage will not adjust,\n            troubleshoot the UPS Charger Circuit.[/li] [/ol] [/div] [/li] [li]If the DC Bus is\n            reading the correct value on the meter, run [em]calibrate[/em] process on the HPL\n            cabinet with the warning.[/li] [li]If warning does not clear, contact Tech Support.[/li]\n            [/ol]",
    type: "warning2",
  },
  {
    title: "Confirmation Required",
    description: "",
    content:
      "[ol] [li]Message shown on the display after pressing a button only once.[/li]\n            [li]To clear, press the button again.[/li] [li]If message does not clear, wiggle wire\n            harness on the back of the button and see if the message goes away. [div]If this makes\n            the issue clear, replace the button/ harness assembly.[/div] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Discharge Over Current",
    description: "",
    content:
      "[ol] [li]Warning at or above 510A. [div]At warning, starts 15 second timer.[/div]\n            [/li] [li]Verify load current among HPL cabinets for incorrect sharing (greater than 5%\n            imbalance max-min is an issue). [ol] [li]Run [em]bms watch[/em] and look for high\n            temperatures on the cabinet that is not sharing correctly.[/li] [li]Use an IR scanner or\n            Thermal Camera and look for hot spots on bus bars on the cabinet that is giving less\n            current.[/li] [/ol] [/li] [li]Reduce load, or verify status and current on displays of\n            other HPL cabinets in string. [ol] [li]Possible extreme cable length differences between\n            the cabinets and the UPS.[/li] [li]Possible under performing HPL battery modules.[/li]\n            [/ol] [/li] [li]Using a DC Current Clamp, verify the current on the HPL display, Current\n            Clamp, and UPS display. [ol] [li]If DC current is not the same on the clamp vs. the HPL\n            display run [em]calibrate[/em] procedure.[/li] [li]If fault still remains, contact Tech\n            Support.[/li] [/ol] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Disconnect Requested",
    description: "",
    content:
      "[ol] [li]Possible field wiring issue of CTB-1 and CTB-2; CTB-10 and CTB-18[/li].\n            [li]Verify field wiring to the applicable submittal brawings in TKO for the correct UPS\n            system.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Door Open",
    description: "",
    content:
      "[div]Warning when door is open. [ol] [li]If warning is present when door is\n            closed, check the alignment of door sensor.[/li] [li]If the door is aligned, use a\n            magnet to see if the door sensor is functional.[/li] [li]If the magnet does not fix the\n            issue, replace the door sensor.[/li] [/ol] [/div]",
    type: "warning2",
  },
  {
    title: "End of Discharge",
    description: "",
    content: "[ol] [li]Warning 30 seconds BEFORE End of Discharge.[/li] [li]Stop the discharge\n            to remove alert.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "High Delta Voltage",
    description: "",
    content:
      "[ol] [li]Warning if one (1) of the HPL racks is 8VDC or higher difference between\n            other battery cabinets that are already connected to the bus. [div] [ol] [li]HPL cabinet\n            will not join the bus until it is within 8VDC of other cabinets that are already on the\n            bus.[/li] [li]The cabinet with the lowest VDC will join bus first after they are all\n            enabled.[/li] [li]If the lowest VDC cabinet does not charge first, disable the remaining\n            cabinets and enable the lowest cabinet first until it starts to charge, then enable the\n            remaining cabinets.[/li] [/ol] [/div] [/li] [li]If troubleshooting, and you believe that\n            the cabinet is refusing to come online, and the State of Charge on the cabinet in\n            question is not coming online, press and hold the [em]Enable[/em] button for five (5)\n            seconds to override the logic and bring the cabinet online.[/li] [li]If this message is\n            seen on a system connected to an EXM UPS, ensure that each HPL cabinet is configured\n            correctly by verifying the SNAPSHOT file for the [em]bms_misc_flags[/em] value is\n            [em]004080[/em]. [div]The 3rd [em]4[/em] is the important digit. Tt means the HPL has\n            permission to connect to the UPS even if the bus is not pre-charged (necessary for\n            EXM).[/div] [div] [ol] [li]If the [em]bms_misc_flags[/em] value is NOT [em]xx4xxx[/em],\n            do the following: [div] [ol] [li]Login to the HPL and get to the [em]$[/em] prompt.[/li]\n            [li]Type [em]set_config[/em], press Enter and see what number it reports.[/li] [li]Type\n            [em]set_config[/em] [em]xx4xxx[/em] and press Enter so that the low bus join setting is\n            enabled.[/li] [/ol] [/div] [/li] [li]Repeat these steps for all cabinets in the\n            system.[/li] [/ol] [/div] [/li] [li]If this message is seen on a system connected to a\n            600/610 UPS, ensure that each HPL cabinet is configured by verifying the SNAPSHOT file\n            for the [em]bms_misc_flags[/em] value is [em]000082[/em]. [div] [ol] [li]If the\n            [em]bms_misc_flags[/em] value is NOT [em]000082[/em] do the following: [div] [ol]\n            [li]Login to the HPL and get to the [em]$[/em] prompt.[/li] [li]Type [em]set_config\n            000082[/em] and press Enter[/li] [/ol] [/div] [/li] [li]Repeat these steps for all\n            cabinets in the system.[/li] [/ol] [/div] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "High SOC",
    description: "",
    content: "[div]See High DC Bus Voltage for troubleshooting.[/div]",
    type: "warning2",
  },
  {
    title: "IOB Frame Error",
    description: "Input/Output Board (IOB) SPI bus communication frame error",
    content:
      "[ol] [li]Warning after one (1) frame error happens (communication problem).[/li]\n            [li]Nothing needs to be done unless this becomes a fault.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Loopback Fault",
    description: "",
    content:
      "[ol] [li]Check wiring between PCA and all battery modules using multimeter.[/li]\n            [li]If multimeter shows open circuit, verify that all wires are plugged firmly into each\n            connector. Most likely a pin insertion issue into a plug.[/li] [li]If nothing found,\n            replace wiring harness between PCA and Battery modules.[/li] [li]Replace BMS Board if it\n            still persists after the replacement of harnesses.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Low Battery",
    description: "",
    content:
      "[ol] [li]Warning at 410VDC or below.[/li] [li]See the [em]Automatic Power Off[/em]\n            section in the HPL Manual.[/li] [li]Recharge batteries.[/li] [li]Check the battery EOD\n            voltage setting in the UPS (autonomy settings) – it may be set too low.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Low Bus Voltage",
    description: "",
    content:
      "[ol] [li]Warning when DC Bus is at 395VDC or below.[/li] [li]Verify that the\n            SNAPSHOT file by checking the SNAPSHOT file for the [em]bms_misc_flags[/em] is setup for\n            the correct UPS (See TKO Chart for correct value for the UPS). [div][strong]TKO >> HPL\n            >> Installation >> HPL Configuration for V1.0.6.x[/strong][/div] [/li] [li]Troubleshoot\n            the UPS to see why the DC Bus is low.[/li] [li]If the UPS displays correct voltage\n            compare with multimeter reading, but the HPL is reading low, run\n            [em]calibrate[/em].[/li] [li]If problem persists, upgrade firmware.[/li] [li]If problem\n            persists, replace PCA.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "MBB Volt/Temp Delta",
    description: "",
    content:
      "[ol] [li] [div]This is most common if the individual battery modules in a cabinet\n            are at very different voltages.[div] [div]The firmware is looking at whether any MBB in\n            the cabinet (each MBB manages half of a battery module) has a voltage difference of 1.7V\n            or more compared to the overall average MBB voltage.[/div] [div]It also looks at whether\n            any battery cell temperature is 20°F or more away from the average cell temperature, but\n            it is uncommon to see the temperature cause this fault to appear.[/div] [/li]\n            [li]Measure the individual battery module voltages in the cabinet. If you find that the\n            voltages are somewhat far apart (usually > 1.5V from max to min would be a problem),\n            follow the steps below.[/li] [li]Order external Lithium Battery Charger to have\n            onsite.[/li] [li]Verify HPL display for actual SOC.[/li] [li]If SOC is below 20%,\n            recharge the batteries. [div] [ol] [li]Refer to Section 5.3.2 – Automatic Power Off in\n            HPL Manual for instructions on recharge.[/li] [li]A change was made in the v1.0.6.x\n            firmware series which makes the firmware more tolerant of voltage difference between\n            battery modules when the state of charge is very low, so updating firmware may make the\n            warning go away.[/li] [/ol] [/div] [/li] [li]If SOC is above 20%, call Tech Support for\n            assistance in troubleshooting.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Module Comms Error",
    description: "",
    content:
      "[ol] [li]Warning if it happens, changes to a fault after 90 seconds.[/li]\n            [li]Likely caused by issues in wiring harness between the battery modules and the BMS.\n            [ol] [li]Use [code]bms watch[/code] script and look for which modules are reporting\n            voltages.[/li] [li]Verify wiring harness connections between the battery modules and the\n            BMS.[/li] [/ol] [/li] [li]Possible problem with circuit board in Power Chassis. [div]If\n            [code]bms watch[/code] reports no voltages and there are no issues with wire harness\n            connections between modules 1 and 6 and the BMS, then replace the BMS board in the power\n            chassis and run the [em]field_cfg[/em] program to integrate the new board.[/div] [/li]\n            [li]Possible problem with Battery Module circuit board. [div]If [code]bms watch[/code]\n            finds a [em]bad section[/em] and if no problems are found with wiring harnesses between\n            battery modules, replace the battery module that is the first one showing no voltages on\n            the [code]bms watch[/code] script. [ol] [li]Order external lithium battery charger.[/li]\n            [li]Replace the battery module.[/li] [/ol] [/div] [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Overload Possible",
    description: "",
    content:
      "[ol] [li] [div]The HPLs are programmed with an expected load in kWb. Multiple HPLs\n            that are wired to communicate with each other will add their expected loads together and\n            then divide the sum by the number of HPLs currently enabled/online.[/div] [div]If this\n            number ever exceeds the rated power delivery of a single HPL cabinet, the [em]overload\n            possible[/em] warning appears. It means that if the UPS goes to battery, the HPLs may\n            cut off before the normal EOD voltage is reached due to overload at the HPLs.[/div][/li]\n            [li]This warning is typically seen when startup activity is still happening and not all\n            parallel HPLs have been put online yet. It will disappear when all the HPLs are brought\n            online.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Over Temp",
    description: "",
    content:
      "[ol] [li]Warning above 139°F (60°C). [div]The warning sometimes appears near the\n            end of a long, high-load discharge, and will go away on its own after the discharge.\n            This is normal.[/div] [/li] [li]If the operating temperature range was in the acceptable\n            range at the beginning of the discharge, then the logs (specifically the cell voltage\n            log) should be analyzed by tech support to determine if there is an under-performing\n            battery module that needs to be replaced.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Over Voltage",
    description: "",
    content:
      "[ol] [li]Warning when total battery string voltage is above 547V.[/li] [li]Check\n            DC Bus with verified good multimeter. [ol] [li]If HPL is showing higher voltage than\n            meter, run [em]field_cfg[/em].[/li] [li]If HPL is still showing higher voltage than\n            meter after [em]field_cfg[/em], reprogram SD card with latest firmware.[/li] [li]If HPL\n            is still showing higher voltage than meter, replace the Power Chassis.[/li] [/ol] [/li]\n            [li]If HPL DC measurement matches multimeter value, then check UPS settings and adjust\n            as necessary to get the DC Bus to match the meter reading.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Peer Comms",
    description: "",
    content:
      "[ol] [li]Warning if it happens.[/li] [li]Verify that the CAN resistor is in the\n            proper location (only on Rack 1 and last rack of a multiple Rack system, only Rack 1 of\n            a single rack system, or on the last rack of a system talking CAN to the UPS (Ex:\n            Trinergy Cube). [ol] [li]If more resistors are present, remove them so that only on\n            cabinet #1 and the last cabinet.[/li] [li]First CAN resistor may be in the UPS (Ex.:\n            Trinergy Cube).[/li] [/ol] [/li] [li]Using a multimeter, verify the resistance across\n            pins 19 and 20 on the HPL cabinets (HPLs Offline without Control Power). Resistance\n            measurement should be about 60 Ohms. [ol] [li]If thes resistance is about 120 Ohms, it\n            means that there is a break in the wiring or only a one-rack system.[/li] [li]Verify the\n            CAN wiring between each rack (Terminal Block pin 19 cabinet 1, to pin 19 cabinet 2,\n            etc., and pin 20 on cabinet 1 to pin 20 on cabinet 2, etc.) on each HPL.[/li] [/ol]\n            [/li] [li]Verify that they are using the recommended Belden Twisted Pair wiring for CAN\n            communication. [/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Power Supply Redundant Loss",
    description: "",
    content:
      "[ol] [li]Redundant control power supply has failed.[/li] [li]Run field_cfg to see\n            if it corrects this.[/li] [li]This can sometimes be caused by faulty wiring inside the\n            power chassis, but it is difficult to find the faulty wire. Recommended to replace Power\n            Chassis.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Service Mode",
    description: "",
    content: "[div]Key is in the [em]Service[/em] position.[/div]",
    type: "warning2",
  },
  {
    title: "Temp Above Discharge",
    description: "",
    content:
      "[div]Warning if the temperature is above 99°F and battery performance could be\n            reduced if a discharge was started while the batteries are this warm.[/div]",
    type: "warning2",
  },
  {
    title: "Under Voltage",
    description: "",
    content: "[div]See [em]Low Battery[/em].[/div]",
    type: "warning2",
  },
  {
    title: "UPS Comm Error",
    description: "Only applicable for Trinigery Cube and EXM2 when CANbus is being used for UPS-battery\n            comms.",
    content:
      "[ol] [li]UPS Comms Lost over CAN bus.[/li] [li]Verify CAN connections.[/li]\n            [li]Verify CAN termination resistor installation.[/li] [li]Verify resistor value at HPL\n            terminal blocks 19-20 (when control power is OFF). Value should be 60 Ohms, and two (2)\n            120 Ohm resistors in parallel should be installed.[/li] [/ol]",
    type: "warning2",
  },
  {
    title: "Battery Voltage Fault",
    description: "Sensor failure. Voltage in a battery module is incorrect or Voltage Sense Board in a\n            Battery Module is faulty.",
    content:
      "[ol] [li]Log into HPL.[/li] [li]Run [code]bms watch[/code] script in\n            HyperTerminal.[/li] [li]Look for bad battery cell voltage to determine which battery\n            module has the issue. [div]M[strong]x[/strong] at the beginning of each row is the\n            Battery Module number (e.g. M3 is Module 3).[/div] [/li] [li]If the alarm is currently\n            not active, check the [em]dlog[/em] file to find the incorrect voltage.\n            [div][strong]Note:[/strong] Battery Modules are numbered from lowest (bottom) to highest\n            (top).[/div] [/li] [li]Replace faulty Battery Module. [ol] [li]Order external Lithium\n            Battery Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "Busbar Over Temp",
    description: "Battery Module has internal busbar that went over its rated temperature, 85°C (185°F)\n            or above.",
    content:
      "[ol] [li]Check [em]dlog[/em] file to find the battery module with temperature\n            issue.[/li] [li]Replace faulty Battery Module. [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "CAN Not Running",
    description: "Software Error, inter-rack communication issue",
    content: "See [em]CAN1 Error[/em] for troubleshooting.",
    type: "fault",
  },
  {
    title: "CAN0 Error",
    description: "[em]CAN0 Error[/em] warning becomes a fault when active after 90s.",
    content:
      "[ul] [li]Likely caused by issues in wiring harness between Battery Modules and\n            BMS. [ol] [li]Use [code]bms watch[/code] script and look for which modules are reporting\n            voltages.[/li] [li]Verify wiring harness connections between Battery Modules and\n            BMS[/li] [/ol] [/li] [li]Possible problem with circuit board in Power Chassis. [div]If\n            [code]bms watch[/code] reports no voltages and there are no issues with wire harness\n            connections between Module 1 and Module 6 and the BMS, then replace Power Chassis.[/div]\n            [/li] [li]Possible problem with Battery Module circuit board. [div]If [code]bms\n            watch[/code] finds a [em]bad section[/em] and if no problems found with wiring harnesses\n            between Battery Modules, replace the battery module that is the first one showing no\n            voltages on the [code]bms watch[/code] script. [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/div] [/li] [/ul]",
    type: "fault",
  },
  {
    title: "CAN1 Error",
    description: "[em]CAN1 Error[/em] warning becomes a fault when active after 30s.",
    content:
      "[ol] [li]Verify the CAN wiring between each rack (terminal block pins 19 and 20 on\n            HPL).[/li] [li]Verify that the CAN resistor is in the proper location (only on Rack 1\n            and Rack N of a multiple Rack system, or only Rack 1 of a single-rack system). [/li]\n            [li]Verify that Belden twisted pair wiring is use for CAN communication.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Cell Over Temp",
    description: "One or more cells above maximum temperature (144°F).",
    content:
      "[ol] [li]Check [em]dlog[/em] file to find the battery module with temperature\n            issue.[/li] [li]Replace faulty Battery Module. [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "Cell Over Voltage",
    description:
      "One or more cells above maximum cell voltage (>4.2VDC). [em]Cell Over Voltage[/em]\n            warning is active for more than 5s.",
    content:
      "[h4]Battery Module reporting a wrong battery voltage[/h4] [ol] [li]Run [code]bms\n            watch[/code].[/li] [li]If no bad cell voltages found, download the logs and contact Tech\n            Support.[/li] [li]If bad battery voltage is found: [ol] [li]Order external Lithium\n            Battery Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "Cell Under Temp",
    description:
      "One or more cells below minimum temperature. Battery module is reporting low\n            temperature: [ul] [li]Firmware before V1.0.6: 59°F[/li] [li]Firmware V1.0.6 or newer:\n            50°F[/li] [/ul]",
    content:
      "[ol] [li]Run [code]bms watch[/code] to look for low temperatures.[/li] [li]If UPS\n            room is very cold, advise the site to raise the temperature.[/li] [li]If low\n            temperatures are only on one Battery Module, replace that Battery Module.[/li] [li]If\n            all battery modules show low temperature and room is not at or below battery fault\n            temperature, replace the PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Cell Under Voltage",
    description:
      "Voltage is less than 1.7V/cell or [em]Cell Under Voltage[/em] warning is active after\n            15s. The HPL is removed from the DC bus.",
    content:
      "[h4]Fault Battery Module[/h4] [ol] [li]Run [code]bms watch[/code].[/li] [li]If a\n            very different battery voltage is found: [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "Charge Over Current",
    description:
      "The charge current reaches ≥250A, or when current is >150A for more than 15s. [div]If\n            current is above 250A for more than 2s, the HPL trips C1 and C2, and the HPL is removed\n            from the DC Bus.[/div]",
    content: "",
    type: "fault",
  },
  {
    title: "Check Contactor",
    description:
      "This fault appears when: [ul] [li]the HPL detects current flowing (more than 2A) in\n            either direction, but C2 is supposed to be open.[/li] [li]the DC bus and battery voltage\n            is >10V.[/li] [/ul]",
    content:
      "[ol] [li]Run [code]field_cfg[/code] and check if the fault returns.[/li]\n            [li]Remove the HPL from the DC Bus, open control power to the PCA, then replace the\n            PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Check Main Contactor",
    description:
      "This fault appears when: [ul] [li]the HPL detects current flowing (more than 2A) in\n            either direction, but C1 is supposed to be open.[/li] [li]the DC bus and battery voltage\n            is >10V.[/li] [/ul]",
    content:
      "[ol] [li]Run [code]field_cfg[/code] and check if the fault returns.[/li]\n            [li]Remove the HPL from the DC Bus, open control power to the PCA, then replace the\n            PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Configure Error",
    description: "",
    content:
      "[div]This is possibly seen during firmware upgrade procedure.[/div] [ol] [li]Run\n            [code]field_cfg[/code] to attempt clearing the fault.[/li] [li]If this does not work,\n            reprogram the SD card, then re-run [code]field_cfg[/code].[/li] [li]If still not\n            working, replace PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Current Fault",
    description: "The discharge current is >525A or the charge current is >250A. Current sensor failure.",
    content: "[ol] [li]Run [code]field_cfg[/code] to attempt clearing the fault.[/li] [li]If\n            still present, replace PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "DC Bus Voltage Fault",
    description: "The battery voltage is >552V. Voltage sensor failure.",
    content: "[ol] [li]Run [code]field_cfg[/code] to attempt clearing the fault.[/li] [li]If\n            still present, replace PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Dischrg Over Current",
    description:
      "The current reaches ≥525A, or when current is >510A for more than 15s. [div]If current\n            is above 525A for more than 2s, the HPL is removed from the DC Bus.[/div]",
    content:
      "[div]Reduce the load, or verify the status of the other battery cabinets in\n            string. Below are some possible issues: [ol] [li]Extreme cable length differences\n            between the cabinets and the UPS.[/li] [li]Under-performing HPL battery modules.[/li]\n            [ol] [/div]",
    type: "fault",
  },
  {
    title: "Disconnect Open",
    description: "Service Disconnect (S1 Switch) is open.",
    content: "Close Service Disconnect.",
    type: "fault",
  },
  {
    title: "Door Open",
    description:
      "The door is open for more than 60s. This is present only on V1.0.4 or older firmware.\n            [div]If the fault occurs when the HPL is online, the HPL will remove itself from the DC\n            Bus.[/div]",
    content:
      "[ol] [li]If alarm present when door is closed, check the alignment of the door\n            sensor.[/li] [li]If the door sensor is aligned, use a magnet to see if the door sensor\n            is functional.[/li] [li]If magnet does not fix the issue, replace the door sensor.[/li]\n            [/ol]",
    type: "fault",
  },
  {
    title: "High DC Bus Voltage",
    description: "Voltage is >547VDC for more than 10min.",
    content:
      "[ol] [li]Verify the DC bus voltage using a multimeter.[/li] [li]If voltage on door\n            display does not match multimeter, adjust UPS Charger Output Voltage down 2VDC and see\n            if HPL adjusts down.[/li] [li]Run [code]field_cfg[/code].[/li] [li]If issue persists,\n            upgrade firmware to latest version.[/li] [li]If issue persists after firmware upgrade,\n            replace PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "IOB Frame Error",
    description:
      "Input/Output Board (IOB) SPI bus communication frame error. [code]IOB Frame\n            Error[/code] warning becomes a fault after five instances.",
    content:
      "[ol] [li]Run [code]field_cfg[/code].[/li] [li]If issue persists, upgrade firmware\n            to latest version.[/li] [li]If issue persists after firmware upgrade, replace PCA.[/li]\n            [/ol]",
    type: "fault",
  },
  {
    title: "IOB Reg PS Failure",
    description: "",
    content:
      "[ol] [li]Recycle control power.[/li] [li]If issue persists, upgrade firmware to\n            latest version.[/li] [li]If issue persists after firmware upgrade, replace PCA.[/li]\n            [/ol]",
    type: "fault",
  },
  {
    title: "IOD Not Running",
    description: "Firmware has stopped running properly.",
    content:
      "[ol] [li]Recycle control power.[/li] [li]If issue persists, upgrade firmware to\n            latest version.[/li] [li]If issue persists after firmware upgrade, replace PCA.[/li]\n            [/ol]",
    type: "fault",
  },
  {
    title: "Loopback Fault",
    description:
      "Loopback Fault is caused by a broken signal connection between the Power Chassis and\n            the Battery Modules. If this condition remains a warning for more than 30 seconds, it\n            becomes a fault. [div] [h4]The Loop that the Loopback Fault refers to[/h4] [/div] [div]\n            The BMS board puts out an up/down pattern on pin 6 and it wants to see the same pattern\n            coming in on pin 5. Each MBB gets this up/down pattern at its FLT_IN pin and repeats it\n            out on its FLT_OUT pin, except if it detects something faulty or it is not working.\n            [/div]",
    content:
      '[div] The Loopback fault should disappear when the loop is forced to exist using a jumper wire or a DMM in ammeter mode. The CAN0 error will appear after a delay when a connector is unplugged. This error can be ignored. [/div][div] If the Loopback fault does not go away when each step is executed and the probes were verified to be on the right pins, then the component above the probes (PCA or battery shelf) is suspected to be faulty. [/div][div] Battery shelf being faulty could mean that the wire harness is faulty or an MBB (board in battery) is faulty. If PCA is faulty, it means the BMS board 700712G1 is faulty since this is the only thing in the PCA that touches the loop. [/div][ol][li]Check PCA by probing BATT header pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 6 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 5 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 4 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 3 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][li]Check battery shelf 2 by probing wire-to-wire connector pins 5 &amp; 6 with jumper wire or DMM in ammeter mode.[/li][/ol][div class="quick-box"][div class="label"]Illustrations:[/div][div class="icon-index"][div][span class="ref-modal"]Battery Monitoring and Balance Boards (MBB)[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/79c8fdc8-a4c4-409a-a633-0f547de48b9f/b3452201.png" /][/div][/div][div][span class="ref-modal"]BATT Header on PCA - Looking at PCA[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/785f8887-5135-4852-9516-960498944b2a/b3452202.png" /][/div][/div][div][span class="ref-modal"]Probing BATT Header Pins with Jumper Wire[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/06b8808b-b8d3-4640-b03a-1d8b2d429628/b3452203.png" /][/div][/div][div][span class="ref-modal"]Probing Wire-to-Wire Connector Pins with Jumper Wire[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/d1c6bd01-627e-4fe8-a949-3e681575cd67/b3452204.png" /][/div][/div][div][span class="ref-modal"]Plug Illustrations[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/b40a21e0-5b12-4f39-bdc7-76055a0902e9/b3452205.png" /][/div][/div][div][span class="ref-modal"]RCPT Illustrations[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/a10e78a9-fb68-49f2-87e9-3d99d06a9b02/b3452206.png" /][/div][/div][div][span class="ref-modal"]Wire Harness 565119 (Inter-Module Wire Harness Layout)[/span][div class="ref-target"][img src="https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/77005efb-09a0-4d7c-8c1f-b165e7ccd74d/pwr_b34/2657e562-f302-4e08-9d76-5a78779f9c78/graphic/8adc3473-58df-4a92-a211-ca467e176e29/b3452207.png" /][/div][/div][/div][/div]',
    type: "fault",
  },
  {
    title: "MBB Board Over Temp",
    description: "Battery Module Board temperature is above 75°C (167°F).",
    content:
      "[ol] [li]Order external Lithium Battery Charger to have onsite for charging new\n            battery module.[/li] [li]Run [code]bms watch[/code] and look for high temp to find\n            correct module to replace.[/li] [li]Replace the battery module.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Module Comms Error",
    description: "[em]Module Comms Error[/em] warning is active for 90s.",
    content:
      "[ul] [li]Likely caused by issues in wiring harness between Battery Modules and\n            BMS. [ol] [li]Use [code]bms watch[/code] script and look for which modules are reporting\n            voltages.[/li] [li]Verify wiring harness connections between Battery Modules and\n            BMS[/li] [/ol] [/li] [li]Possible problem with circuit board in Power Chassis. [div]If\n            [code]bms watch[/code] reports no voltages and there are no issues with wire harness\n            connections between Module 1 and Module 6 and the BMS, then replace Power Chassis.[/div]\n            [/li] [li]Possible problem with Battery Module circuit board. [div]If [code]bms\n            watch[/code] finds a [em]bad section[/em] and if no problems found with wiring harnesses\n            between Battery Modules, replace the battery module that is the first one showing no\n            voltages on the [code]bms watch[/code] script. [ol] [li]Order external Lithium Battery\n            Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/div] [/li] [/ul]",
    type: "fault",
  },
  {
    title: "Module Fault",
    description: "At least one Battery Module has an MBB that is reporting a problem with the battery\n            cells (e.g., shorted cell).",
    content:
      "[ol] [li]Use [code]bms watch[/code] script and look for a battery module that is\n            reporting one or more cells that are at a different voltage than the rest. [div]This\n            should determine which battery module (M1, M2, etc) has a problem.[/div] [/li] [li]If\n            bad battery voltage is found: [ol] [li]Order external Lithium Battery Charger.[/li]\n            [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "Over Temp",
    description: "Temperature is above 62°C (144°F).",
    content:
      "[div]In rare cases, the HPL will reach the fault condition before the UPS cuts off\n            the discharge at the EOD voltage. Typically, this means that the batteries have\n            abnormally high capacity due to manufacturing variability and their voltage did not\n            decay as fast as the average set of HPL batteries.[/div] [div]To verify this is the\n            case, the expected runtime generated by the Li-ion battery runtime calculator (which is\n            available to Tech Support) can be compared to the actual runtime seen in the field. If\n            the actual runtime exceeded the expected runtime, it is normal for the HPL to reach a\n            fault condition and end the discharge. In this case, there is no problem that can be\n            fixed - the batteries provided more than the promised runtime during the outage. [/div]\n            [div]If the fault condition is reached and the discharge time was well short of the\n            promised runtime generated by the runtime calculator, first contact tech support with\n            the HPL’s logs to verify that the batteries’ starting temperature before the discharge\n            was within the published operating range of the HPL, which is in both the operation\n            &\n            service manuals. It is possible that the batteries started outside this operating range.\n            In which case, Vertiv does not guarantee any runtime for them.[/div] [div]If the\n            operating temperature range was in the acceptable range at the beginning of the\n            discharge, then the logs (specifically the cell voltage log) should be analyzed by Tech\n            Support to determine if there is an under-performing battery module that needs to be\n            replaced.[/div]",
    type: "fault",
  },
  {
    title: "Over Voltage",
    description: "The voltage is above 552V for 10s or more.",
    content:
      "[ol] [li]Using a multimeter, check the DC Bus.[/li] [li]If HPL is showing higher\n            voltage than meter: [ol] [li]Run [code]field_cfg[/code].[/li] [li]If the HPL is still\n            showing higher voltage than meter after running [code]field_cfg[/code], reprogram SD\n            card with latest firmware.[/li] [li]If the HPL is still showing higher voltage than\n            meter, replace Power Chassis.[/li] [ol] [/li] [li]If the HPL DC measurement matches the\n            multimeter value, then check UPS settings and adjust as necessary to get the DC Bus to\n            match the meter reading.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "PEERD Not Running",
    description: "",
    content:
      "[ol] [li]Run [code]polaris_config[/code].[/li] [li]Run\n            [code]field_cfg[/code].[/li] [li]Reprogram SD card with latest firmware. [div]Refer to\n            the note below.[/div] [/li] [li]Replace the PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Polarity Fault",
    description: "",
    content:
      "[ol] [li]Verify polarity of Battery Connections to the HPL.[/li] [li]Verify\n            polarity of Battery Connections to the UPS.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "POS BATT Fuse Blown",
    description: "",
    content: "[ol] [li]Run [code]field_cfg[/code].[/li] [li]Replace the positive battery fuse\n            and/or the PCA.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Replace Main Contactor",
    description: "Too many cycles of the Main contactor (fault after 100 high current cycles).",
    content: "Replace the PCA.",
    type: "fault",
  },
  {
    title: "Reset Fault Required",
    description: "",
    content:
      "[ol] [li]Press [em]Stop[/em] to reset the fault.[/li] [li]Run\n            [code]field_cfg[/code] if problem persists.[/li] [li]Replace [em]Stop[/em] if problem\n            persists after [code]field_cfg[/code].[/li] [/ol]",
    type: "fault",
  },
  {
    title: "Temperature Fault",
    description: "Temperature sensor failure in a Battery Module",
    content:
      "[ol] [li]Run [code]bms watch[/code] and look for very different battery/cell\n            temperature to find correct module to replace.[/li] [li]Replace the battery module.[/li]\n            [/ol]",
    type: "fault",
  },
  {
    title: "Under Voltage",
    description: "Voltage is below 395V for 15s.",
    content:
      "[ol] [li]Using a multimeter, check the DC voltage. [div]Refer to the Force Online\n            section of the Operations Guide.[/div] [/li] [li]If HPL is showing a different voltage\n            from the meter: [ol] [li]Run [code]field_cfg[/code].[/li] [li]If the HPL is still\n            showing different voltage than meter after running [code]field_cfg[/code], reprogram SD\n            card with latest firmware.[/li] [li]If the HPL is still showing different voltage than\n            meter, replace Power Chassis.[/li] [ol] [/li] [li]If the HPL DC measurement matches the\n            multimeter value, then check UPS settings and adjust as necessary to get the DC Bus to\n            match the meter reading.[/li] [/ol]",
    type: "fault",
  },
  {
    title: "WD Fault",
    description: "Occurs 5s after watchdog failure.",
    content:
      "[ol] [li]Press [em]Stop[/em] to try and clear the fault.[/li] [li]If fault does\n            not clear: [ol] [li]Run [code]field_cfg[/code].[/li] [li]Reprogram the SD card.[/li]\n            [li]Replace the Power Chassis.[/li] [/ol] [/li] [/ol]",
    type: "fault",
  },
  {
    title: "Busbar Over Temp",
    description: "Module busbar overtemperature condition.",
    content:
      "[ol] [li]Battery Module has internal busbar that went over its rated temperature,\n            85°C (185°F) or above.[/li] [li]Check [em]dlog[/em] file to find the battery module with\n            temperature issue.[/li] [li]Check for signs of a loose busbar in the cabinet. This fault\n            can occur if a busbar is not tightly bolted to a + or – battery module terminal, which\n            causes extra heat to be generated at the battery terminal.[/li] [li]Alternate solution -\n            Replace faulty Battery Module. [ol] [li]Order external Lithium Battery Charger.[/li]\n            [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Battery Voltage Fault",
    description: "Sensor failure.",
    content:
      "[ol] [li] Voltage in a battery module is incorrect or Voltage Sense Board in a\n            Battery Module is faulty.[/li] [li]Log into HPL.[/li] [li]Run [code]bms watch[/code]\n            script in HyperTerminal.[/li] [li]Look for bad battery cell voltage to determine which\n            battery module has the issue. [div]M[strong]x[/strong] at the beginning of each row is\n            the Battery Module number (e.g. M3 is Module 3).[/div] [/li] [li]If the alarm is\n            currently not active, check the [em]dlog[/em] file to find the incorrect voltage.\n            [div][strong]Note:[/strong] Battery Modules are numbered from lowest (bottom) to highest\n            (top).[/div] [/li] [li]Replace faulty Battery Module. [ol] [li]Order external Lithium\n            Battery Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault2",
  },
  {
    title: "CAN Not Running",
    description: "Software Error, inter-rack communication issue",
    content: "See [em]CAN1 Error[/em] or [em]Peer Comms[/em] for troubleshooting.",
    type: "fault2",
  },
  {
    title: "CAN0 Error",
    description: "Warning becomes a fault when active after 90s.",
    content:
      "[ul] [li]Likely caused by issues in wiring harness between Battery Modules and\n            BMS. [ol] [li]Use [code]bms watch[/code] script and look for which modules are reporting\n            voltages.[/li] [li]Verify wiring harness connections between Battery Modules and\n            BMS.[/li] [/ol] [/li] [li]Possible problem with circuit board in Power Chassis (BMS\n            board). [div]If [code]bms watch[/code] reports no voltages, and there are no issues with\n            wire harness connections between Module 1 and Module 6 and the BMS, then replace BMS\n            board inside the Power Chassis, then run the [code]field_cfg[/code] script to integrate\n            the new board into the cabinet.[/div] [/li] [li]Possible problem with Battery Module\n            circuit board. [div]If [code]bms watch[/code] finds a [em]bad section[/em], and if no\n            problems found with wiring harnesses between Battery Modules, replace the battery module\n            that is the first one showing no voltages on the [code]bms watch[/code] script. [ol]\n            [li]Order external Lithium Battery Charger.[/li] [li]Replace the Battery Module.[/li]\n            [/ol] [/div] [/li] [/ul]",
    type: "fault2",
  },
  {
    title: "CAN1 Error",
    description: "",
    content:
      "[ul] [li]Fault after 30 seconds of active Warning.[/li] [li]Verify the CAN wiring\n            between each rack (Terminal Block pins 19 and 20 on HPL).[/li] [li]Verify that the CAN\n            resistor is in the proper location (only on Rack 1 and Rack N of a multiple Rack system,\n            or only Rack 1 of a single-rack system).[/li] [li]Verify that the user is using the\n            recommended Belden Twisted Pair wiring for CAN communication.[/li] [/ul]",
    type: "fault2",
  },
  {
    title: "Cell Over Temp",
    description: "One (1) or more cells above maximum temperature.",
    content:
      "[ol] [li]Warning starts at 139°F.[/li] [li]Fault starts at 144°F.[/li] [li]Check\n            battery autonomy settings (especially EOD voltage) in the UPS with TKO.[/li] [li]The\n            most common cause of this is that the batteries ran longer than advertised during a\n            discharge test, and reached high temperature cutoff before the UPS EOD voltage was\n            reached. [div]This is not considered a defect unless battery runtime was shorter than\n            advertised.[/div] [/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Cell Over Voltage",
    description: "One (1) or more cells above maximum cell voltage.",
    content:
      "[ol] [li]Fault at > 4.2 V/cell.[/li] [li]Fault if warning is active for more than\n            five (5) seconds.[/li] [li]See [em]Over Voltage[/em] for troubleshooting steps.[/li]\n            [li]Battery Module reporting a wrong battery voltage. [ol] [li]Run [code]bms\n            watch[/code].[/li] [li]If no bad cell voltages found, download the logs and contact Tech\n            Support.[/li] [li]If bad battery voltage is found: [ol] [li]Order external Lithium\n            Battery Charger.[/li] [li]Replace the Battery Module.[/li] [/ol] [/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Cell Under Temp",
    description: "One (1) or more cells below minimum temperature.",
    content:
      "[ol] [li]Battery module is reporting low temperature: [ul] [li]Firmware before\n            V1.0.6: 59°F[/li] [li]Firmware V1.0.6 or newer: 50°F[/li] [/ul] [/li] [li]Run [code]bms\n            watch[/code] to look for low temperatures.[/li] [li]If UPS room is very cold, advise the\n            site to raise the temperature.[/li] [li]If low temperatures are only on one (1) Battery\n            Module, replace that battery module.[/li] [li]If all battery modules show low\n            temperature and room is not at or below battery fault temperature, contact Tech\n            Support.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Cell Under Voltage",
    description: "",
    content:
      "[ol] [li]Less than 2.0V/cell is immediate fault, or after 15 seconds of active\n            warning (2.7V/cell) then removes HPL from DC Bus.[/li] [li]See [em]Under Voltage[/em]\n            troubleshooting steps.[/li] [li]If this did not occur after a discharge test, and the\n            fault is persistent (won’t clear when pressing RESET button), then the customer may have\n            left batteries off charger for a very long time (weeks or months). [div]Contact tech\n            support because batteries may need to be replaced at the customer’s expense.[/div][/li]\n            [li]If this occurs after a discharge test, and the fault can be cleared by pressing the\n            RESET button, and battery runtime was longer than advertised, the UPS battery autonomy\n            settings may have too low of an EOD voltage. [div]Check the settings on TKO. The battery\n            EOD voltage likely needs to be raised.[/div][/li] [li]If this occurs after a discharge\n            test, and the fault can be cleared by pressing the RESET button, and battery runtime was\n            shorter than advertised, the battery module may just have bad performance and need\n            replaced. [/li] [li]Run BMS Watch to see if one (1) battery has very different battery\n            cell voltage. If so: [ol] [li]Order external Lithium Battery Charger to have\n            onsite.[/li] [li]Replace battery module.[/li] [ol] [/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Charge Over Current",
    description: "",
    content:
      "[div]Fault will occur when the charge current reaches ≥ 250A, or when current is\n            >150A for more than 15s.[/div] [ol] [li]If current is above 250A for more than 2s, the\n            HPL trips C1 and C2, and the HPL is removed from the DC Bus.[/li] [li]See [em]Charge\n            Over Current[/em] warning for troubleshooting steps.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Check Main Contactor",
    description: "",
    content:
      "[ol] [li]If the HPL detects current flowing is > 3A in either direction, but C1\n            contactor is supposed to be open, it assumes the contactor is stuck closed and this\n            fault appears.[/li] [li]If the DC bus and battery voltage are > 10.0V, this fault\n            appears because the contactor may be stuck open.[/li] [li]Run [em]calibrate[/em] and see\n            if the fault returns.[/li] [li]If fault returns, remove the HPL from the DC Bus, open\n            Control Power to the PCA, then Replace the PCA.[/li] [/ol] [div] [strong]Important\n            Note:[/strong] Do NOT remove the current flow by opening the S1 Switch on the front of\n            the PCA.[/div]",
    type: "fault2",
  },
  {
    title: "Check Contactor",
    description: "",
    content: "[div]See [em]Check Main Contactor[/em] for troubleshooting steps.[/div]",
    type: "fault2",
  },
  {
    title: "CIB Current Fault",
    description: "",
    content:
      "[ol] [li]When C1 Main Contactor was opened by the Contactor Interrupt Board (CIB)\n            due to a sensed high current measurement (583 Discharging or 276A Charging).[/li] [li]If\n            the fault cannot be cleared (press Reset), go to the troubleshooting section for\n            [em]Charge or Discharge Overcurrent[/em] and follow those steps.[/li] [li]If the fault\n            cannot be cleared by pressing Reset, then replace contactor interrupt board inside the\n            PCA, or check the wire harness that travels to it (6-pin connector on contactor\n            interrupt board).[/li] [li]If fault still does not clear, try replacing the wire harness\n            that travels to the contactor interrupt board’s 6-pin connector.[/li] [li]If fault still\n            does not clear, try replacing the entire PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Configure Error",
    description: "This is possibly seen during firmware upgrade procedure.",
    content:
      "[ol] [li]Run [code]field_cfg[/code] to attempt clearing the fault.[/li] [li]If\n            this does not work, reprogram the SD card, then re-run [code]field_cfg[/code].[/li]\n            [li]If it is still not working, replace BMS board in PCA and then run\n            [code]field_cfg[/code] script to integrate the new board into the system. [li]If it is\n            still not working, replace entire PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Current Fault",
    description: "",
    content: "[div]See [em]CIB Current Fault[/em] for troubleshooting steps.[/div]",
    type: "fault2",
  },
  {
    title: "DC Bus Voltage Fault",
    description: "",
    content:
      "[ol] [li]If the battery voltage is > 552V then, this fault will set.[/li]\n            [li]Voltage sensor failure.[/li] [li]Run [code]field_cfg[/code] to attempt clearing the\n            fault.[/li] [li]If it is still present, replace PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Discharge Over Current",
    description: "",
    content: "[div]See [em]Discharge Over Current[/em] in warning section for troubleshooting\n            steps.[/div]",
    type: "fault2",
  },
  {
    title: "Disconnect Open",
    description: "",
    content:
      "[ol] [li]Service Disconnect (S1 Switch) Open.[/li] [li]Turn OFF CTL PWR breaker\n            and then close Service Disconnect switch (S1).[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Door Open",
    description: "Only on V 1.0.4 and older firmware",
    content:
      "[div]Fault when door is open for more than 60 seconds – only on V 1.0.4 and older\n            firmware.[/div] [ol] [li]HPL will take itself off the DC bus when [em]online[/em] when\n            Fault occurs. [li]If the alarm is still present when the door is closed,, check the\n            alignment of the door sensor.[/li] [li]If the door sensor is aligned, use a magnet to\n            see if the door sensor is functional.[/li] [li]If the magnet does not fix the issue,\n            replace the door sensor.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "High DC Bus Voltage",
    description: "",
    content:
      "[ol] [li]Fault if above 547VDC for more than 10 minutes.[/li] [li]If the DC bus\n            voltage measured does not match the multimeter and UPS float voltage settings, adjust\n            the UPS Charger Output Voltage down to 2VDC and see if the HPL adjusts down. [div]If HPL\n            refuses to connect to the UPS because its batteries charged too high, it will still\n            drain the batteries down using its own control power even if not connected to the UPS,\n            but it maybe needed to wait overnight before the batteries have drained enough for the\n            voltage to come down.[/div] [/li] [li]Run [code]field_cfg[/code].[/li] [li]If the issue\n            persists, upgrade the firmware to the latest version.[/li] [li]If the issue persists\n            after the firmware upgrade, replace the PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "IOB Frame Error",
    description: "Input/Output Board SPI bus communication frame error.",
    content:
      "[ol] [li]Fault after five (5) seconds.[/li] [li]Run [code]field_cfg[/code].[/li]\n            [li]Update to the latest firmware version.[/li] [li]If the issue persists, replace the\n            PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "IOB Reg PS Failure",
    description: "",
    content: "[ol] [li]Recycle Control Power.[/li] [li]Upgrade to the latest firmware\n            version.[/li] [li]Replace the PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "IOD Not Running",
    description: "Firmware stopped running properly.",
    content:
      "[div]See [em]IOB Frame Error[/em]. If there are too many frame errors, the\n            firmware program that manages the BMS-IO board communication will crash and this fault\n            will display.[/div]",
    type: "fault2",
  },
  {
    title: "MBB Board Over Temp",
    description: "",
    content:
      "[ol] [li]Battery Module Board temperature above 75°C (167°F). This is rare.[/li]\n            [li]Order external Lithium Battery Charger to have onsite for charging new battery\n            module.[/li] [li]Replace Battery Module then Run BMS Watch and look for high temperature\n            to find the correct module to replace.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Module Comms Error",
    description: "",
    content: "[div]See [em]Module Comms Error[/em] in warning section for troubleshooting\n            steps.[/div]",
    type: "fault2",
  },
  {
    title: "Module Fault",
    description: "",
    content:
      "[ol] [li]At least one (1) battery module has a monitoring and balance board (MBB)\n            that is reporting a problem with the battery cells, such as a shorted cell. [div]Use\n            [em]bms watch[/em] script and look for a battery module that is reporting one (1) or\n            more cells that are at a different voltage than the rest. This should determine which\n            battery module (M1,M2,etc.) has a problem.[/div] [/li] [li]If bad battery voltage was\n            found: [ol] [li]Order external Lithium Battery Charger.[/li] [li]Replace Battery\n            Module.[/li] [/ol] [/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Over Temp",
    description: "",
    content: "[div]See [em]Cell Over Temp[/em].[/div]",
    type: "fault2",
  },
  {
    title: "Over Voltage",
    description: "",
    content: "[div]See [em]Over Voltage[/em] in warning section for troubleshooting steps.[/div]",
    type: "fault2",
  },
  {
    title: "PEERD Not Running",
    description: "",
    content: "[div]See [em]CAN1 Error[/em] or [em]Peer Comms[/em] for troubleshooting\n            steps.[/div]",
    type: "fault2",
  },
  {
    title: "Polarity Fault",
    description: "",
    content:
      "[ol] [li]Verify polarity of Battery Connections to the HPL.[/li] [li]Verify\n            polarity of Battery Connections to the UPS.[/li] [li]If this fault is persistent and the\n            polarity of UPS-HPL power connections is proven to be correct using a DMM (+ and –\n            polarity coming from UPS was measured at HPL backplane), then use the HPL\n            [em]calibrate[/em] program to calibrate the HPL.[/li] [li]If fault persists, replace\n            power chassis.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "POS BATT Fuse Blown",
    description: "",
    content: "[ol] [li]Run [em]calibrate[/em] program on the HPL.[/li] [li]If fault is still\n            present, replace the PCA.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Replace Main Contactor",
    description: "",
    content:
      "[ol] [li]Too many cycles of the Main contactor (fault after 100 high current\n            cycles). Very rare.[/li] [li]Remove power chassis from cabinet, open, and inspect for\n            signs of high heat (like discoloration of busbars) around contactor terminals.[/li]\n            [li]Contact tech support, who may recommend replacing PCA based on log file\n            analysis.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Reset Fault Required",
    description: "",
    content:
      "[ol] [li]Must press [em]Stop/Reset[/em] button to reset the fault. Fault can only\n            be reset if its condition (like over voltage) has been cleared, though.[/li] [li]Run\n            [code]field_cfg[/code] if problem persists without an apparent root cause.[/li]\n            [li]Replace [em]Stop[/em] button wire harness (including the button itself, soldered\n            into the harness) if button does not appear to be working at all.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Temperature Fault",
    description: "",
    content:
      "[ol] [li]Temperature Sensor failure in Battery Module.[/li] [li]Replace the\n            Battery Module and then run BMS watch and look for very different Battery/Cell temp to\n            find correct module to replace.[/li] [/ol]",
    type: "fault2",
  },
  {
    title: "Under Voltage",
    description: "Fault < 395V for 15s.",
    content: "[div]See [em]Under Voltage[/em] in warning section for troubleshooting\n            steps.[/div]",
    type: "fault2",
  },
  {
    title: "WD Fault",
    description: "",
    content: "[div]See [em]CIB Current Fault[/em] section for troubleshooting steps.[/div]",
    type: "fault2",
  },
];
