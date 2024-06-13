export const DEF = {
    Home: {
        title: `Introduction to OSeMOSYS`,
        definition:
            `
        <blockquote>
            <p>
                At present there is a useful, but limited set of open, free and accessible energy system modeling tools. These tools often require significant investment in terms of human resources, training and software purchases in order to apply or further develop them. The Open Source energy MOdelling SYStem (OSeMOSYS) is specifically designed as a tool to inform the development of local, national and multi-regional energy strategies and support them with capacity building activities. Unlike other long established energy systems (partial equilibrium) modeling frameworks (i.e. MARKAL/TIMES , MESSAGE , PRIMES , EFOM and POLES ), it potentially requires a less significant learning curve. Additionally, by not using proprietary software or commercial programming languages and solvers, OSeMOSYS requires no upfront financial investment. This feature increases its affordability, particularly in developing countries.
            </p>
                It was developed in collaboration with a range of institutions, including the International Atomic Energy Agency (IAEA), the United Nations Industrial Development Organisation (UNIDO), KTH Royal Institute of Technology, Stanford University, University College London (UCL), University of Cape Town (UCT), Paul Scherrer Institute (PSI), Stockholm Environment Institute (SEI), and North Carolina State University. The first version of OSeMOSYS was made available in 2008, while the first peer-reviewed publication describing its ethos and structure was available in 2011 .
            </p>
            <p>
                OSeMOSYS computes the energy supply mix (in terms of generation capacity and energy delivery) which meets the energy services demands every year and in every time step of the case under study, minimising (in its most common form) the total discounted costs. It can cover all or individual energy sectors, including heat, electricity and transport and has a user-defined spatial and temporal domain and scale. The energy demands can be met through a range of technologies which have certain techno-economic characteristics and draw on a set of resources, defined by certain potentials and costs. On top of this, policy scenarios may impose certain technical constraints, economic realities or environmental targets. As in most long-term optimisation modeling tools, OSeMOSYS in its standard configuration assumes a unique decision-maker, perfect foresight and competitive markets.
            </p>
            <p>
                In mathematical terms, it is a deterministic, linear optimisation, long-term modeling framework. Mixed-integer linear programming may be applied for certain functions, like the optimisation of discrete power plant capacity expansions.
            </p>
            <p>
                One of its main characteristics is the wide and flexible definition of technology and energy vector. A technology represents any asset operating energy conversion processes, from resource extraction and processing to electricity supply, transmission and distribution and end-use appliances. It could therefore refer to, for example, an oil refinery, a hydropower plant or a heating system. Each technology is characterised by a transfer function defined by numerous economic, technical and environmental parameters (e.g. investment and operating costs, efficiency, availability, emission factors, capacity factor, minimum load, etc.).
            </p>
            <p>
                The original OSeMOSYS code is written in GNU MathProg, a high level mathematical programming language, yet straightforward enough to be understandable by all kinds of users, expert or not in linear programming. In its full version, the code consists of 700 text lines, highly resembling algebraic expressions. Further parallel versions of the code have been written in GAMS and Python, for better connection to the respective families of users and coders. The open source solver GLPK may be used for translating the models in matrices, finding the optimal solution and printing the numerical outputs.
            </p>
            <p>
                OSeMOSYS applications can be created and run without interface. Still, several user interfaces have been developed and are largely employed in teaching and capacity building activities. The Model Management Infrastructure (MoManI) is an open source, free interface for creating models and visualising results, available both in online and desktop version. In addition, OSeMOSYS is integrated into LEAP as module for computing supply capacity expansion planning.
            </p>
            <p>
                OSeMOSYS is available for download at <a href="http://www.osemosys.org">http://www.osemosys.org</a>.
            </p>
            <small>Source <cite title="Source Title">http://www.osemosys.org/</cite></small>
        </blockquote>

        `
    },
    ViewData: {
        title: `View all parameters data by SETS.`,
        definition:
            `
        <blockquote>
            <p>
                user can select one of the sets, technolgy, commodity and emisssion and see all paramteter values in the model. Scenario data is dsplayed only id there are values entered and it is coloured in different..
            </p>
            <small>Source <cite title="Osemsys CLEW interface</cite></small>
        </blockquote>

        `
    },
    AddCase: {
        title: `Structure of OSeMOSYS`,
        definition:

            `
            <blockquote>
                <p>
                    The ‘sets’ define the physical structure of a model, usually independent from the specific scenarios which will be run. They define the time domain and time split, the spatial coverage, the technologies and energy vectors to be considered, etc. For instance, when a variable is defined as a function of the set ‘YEAR’ it will be indicated as variablename[y] at it will be computed for every year listed in the set. The sets of OSeMOSYS are presented in the Table below.
                </p>
                <small>Source <cite title="Source Title">http://www.osemosys.org/</cite></small>
            </blockquote>
            <article class="col-xs-12 col-sm-12">
            
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>SETS</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                            <th>Index</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">YEAR</td>
                                            <td class="hidden-xs">It represents the time frame of the model, it contains all the years to be considered in the study.</td>
                                            <td>y</td>    
                                        </tr>		
                                         <tr>
                                            <td class="v-align-m">TECHNOLOGY</td>
                                            <td class="hidden-xs">It includes any element of the energy system that changes a commodity from one form to another, uses it or supplies it. All system components are set up as a ‘technology’ in OSeMOSYS. As the model is an abstraction, the modeller is free to interpret the role of a technology at will, where relevant. It may for example represent a single real technology (such as a power plant) or can represent a heavily aggregated collection of technologies (such as the stock of several million light bulbs), or may even simply be a ‘dummy technology’, perhaps used for accounting purposes.</td>
                                            <td>t</td>
                                        </tr>	
                                        <tr>
                                            <td class="v-align-m">TIMESLICE</td>
                                            <td class="hidden-xs">It represents the time split of each modelled year, therefore the time resolution of the model. Common to several energy systems modelling tools (incl. MESSAGE / MARKAL / TIMES), the annual demand is ‘sliced’ into representative fractions of the year. It is necessary to assess times of the year when demand is high separately from times when demand is low, for fuels that are expensive to store. In order to reduce the computation time, these ‘slices’ are often grouped. Thus, the annual demand may be split into aggregate seasons where demand levels are similar (such as ‘summer, winter and intermediate’). Those seasons may be subdivided into aggregate ‘day types’ (such as workdays and weekends), and the day further sub divided (such as into day and night) depending on the level of demand.</td>
                                            <td>l</td>    
                                        </tr>	 
                                        <tr>
                                            <td class="v-align-m">COMMODITY</td>
                                            <td class="hidden-xs">It includes any energy vector, energy service or proxies entering or exiting technologies. These can be aggregate groups, individual flows or artificially separated, depending on the requirements of the analysis.</td>
                                            <td>c</td>    
                                        </tr>    
                                        <tr>
                                            <td class="v-align-m">EMISSION</td>
                                            <td class="hidden-xs">It includes any kind of emission potentially deriving from the operation of the defined technologies. Typical examples would include atmospheric emissions of greenhouse gasses, such as CO2.</td>
                                            <td>e</td>    
                                        </tr>   
                                        <tr>
                                            <td class="v-align-m">SEASON</td>
                                            <td class="hidden-xs">It gives indication (by successive numerical values) of how many seasons (e.g. winter, intermediate, summer) are accounted for and in which order. This set is needed if storage facilities are included in the model.</td>
                                            <td>ls</td>    
                                        </tr>    
                                        <tr>
                                            <td class="v-align-m">DAYTYPE</td>
                                            <td class="hidden-xs">It gives indication (by successive numerical values) of how many day types (e.g. workday, weekend) are accounted for and in which order. This set is needed if storage facilities are included in the model.</td>
                                            <td>ld</td>    
                                        </tr>                             											
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>
        `
    },
    RES: {
        title: `Reference Energy System`,
        definition:
            `
        <blockquote>
            <p>
            The Reference Energy System (RES) is a network representation of all of the technical activities required to supply various forms of energy to end-use activities.
            </p>
            <small>Acknowledgements <cite title="Source Title">https://plotly.com/</cite></small>
        </blockquote>

        `
    },
    R: {
        DR: {
            title: `Region parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Global parameters</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">DiscountRate[r]</td>
                                            <td class="hidden-xs">The fixed O&M costs charged for each unit of installed capacity of a technology (e.g. $/kW, $/PJ/yr, $ per Mm3/yr etc. ). Fixed costs are incurred for all existing capacity, irrespective of whether they are used or not.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RY: {
        RM: {
            title: `Year parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Reserve margin</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">ReserveMargin[r,y]</td>
                                            <td class="hidden-xs">Defines the capacity reserve requirement (i.e. installed capacity required over the peak demand - as modelled) for the corresponding commodity. Only calculated for commodities with the ReserveMarginTagFuel set to 1 and mainly used for electricity commodities to ensure that sufficient power generation capacity is in place to meet peak demand. </td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        },
        RMPT: {
            title: `Year parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Reserve margin</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">RE Min Production Target[r,y]</td>
                                            <td class="hidden-xs">....</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RT: {
        TMPAU: {
            title: `Technology parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5">
                    <header>
                        <h2>Activity constraints</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">TotalTechnologyModelPeriodActivityUpperLimit[r,t]</td>
                                            <td class="hidden-xs">The maximum allowable cumulative activity for a technology over the entire model horizon (i.e. the sum of activity in all modes of operation and all years most be lower than the value specified here). Can for instance be used to represent depletable resources, such as fossil fuel reserves.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>`
        },
        TMPAL: {
            title: `Technology parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" >
                    <header>
                        <h2>Activity constraints</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">TotalTechnologyModelPeriodActivityLowerLimit[r,t]</td>
                                            <td class="hidden-xs">The minimum allowable cumulative activity for a technology over the entire model horizon (i.e. the sum of activity in all modes of operation and all years most be greater than the value specified here). Can for instance be used to represent depletable resources, such as fossil fuel reserves.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>`
        },
        OL: {
            title: `Technology parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5"> 
                    <header>
                        <h2>Performance</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">OperationalLife[r,t]</td>
                                            <td class="hidden-xs">OperationalLife defines the number of years that a technology will exist before being retired should the model decide to install this technology.  For example, wind turbines often have an expected life of 25 years while hydro dams often have an expected life of 80 or more years.</td>
                                        </tr>											
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>`
        },
        CAU: {
            title: `Technology parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" >
                    <header>
                        <h2>Performancece</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">CapacityToActivityUnit[r,t]</td>
                                            <td class="hidden-xs">CapacityToActivityUnit is used to specify the relationship between the units of capacity and activity for a technology. A value of '1' specifies that the units for both capacity and activity are the same for that technology. Instead, for instance, a value of '365' can be used to  specify capacity in 'barrels per day' but activity in 'barrels'.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>`
        }
    },
    RE: {
        MPEL: {
            title: `Emission parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Emissions</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>	
                                        <tr>
                                            <td class="v-align-m">ModelPeriodEmissionLimit[r,e]</td>
                                            <td class="hidden-xs">Annual upper limit for a specific emission generated in the whole modelled region, over the entire modelled period.</td>
                                        </tr>												
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        },
        MPEE: {
            title: `Emission parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Emissions</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">ModelPeriodExogenousEmission[r,e]</td>
                                            <td class="hidden-xs">It allows the user to account for additional emissions over the entire modelled period, on top of those computed endogenously by the model (e.g. generated outside the region).</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RYCn: {
        CC: {
            title: `Region parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>User defined constraints</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">UDCConstant [r, u, y]</td>
                                            <td class="hidden-xs">Represents the 'Right-hand-side' of the user-defined constraint equation.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RYTCn: {
        CCM: {
            title: `Region parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>User defined constraints</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">UDC Multiplier Total Capacity</td>
                                            <td class="hidden-xs">Coefficient used to construct user-defined constraints. It is multiplied with the total capacity ('TotalCapacityAnnual' variable) of a technology for each year in a user-defined constraint.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        },
        CNCM: {
            title: `Region parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>User defined constraints</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">UDC Multiplier New Capacity</td>
                                            <td class="hidden-xs">Coefficient  used to construct user-defined constraints. It is multiplied with the new capacity ('NewCapacity' variable) of a technology for each year in a user-defined constraint.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        },
        CAM: {
            title: `Region parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>User defined constraints</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">UDC Multiplier Activity</td>
                                            <td class="hidden-xs">Co-efficient used to construct user-defined constraints. It is multiplied with the total activity ('TotalTechnologyAnnualActivity' variable) of a technology for each year in a user-defined constraint.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RYT: {
        AF: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Performance</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">AvailabilityFactor[r,t,y]</td>
                                                <td class="hidden-xs">AvailabilityFactor is used to specify the fraction of a technology's theoretical maximum output that that can actually be produced. It can be used to represent, for instance, planned maintenance of a powerplant.</td>
                                            </tr>	
																
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        CC: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Technology costs</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">CapitalCost[r,t,y]</td>
                                                <td class="hidden-xs">The investment cost of adding one unit to existing capacity of a technology (e.g. $/kW, $/PJ/yr, $ per Mm3/yr etc. ).</td>
                                            </tr>																	
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`

        },
        FC: {

            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Technology costs</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">FixedCost[r,t,y]</td>
                                                <td class="hidden-xs"> Fixed O&M cost of a technology, per unit of capacity. </td>
                                            </tr>																
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        VC: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Technology costs</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">VariableCost[r,t,m,y]</td>
                                                <td class="hidden-xs"> Cost of a technology for a given mode of operation (Variable O&M cost), per unit of activity. </td>
                                            </tr>																
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        RC: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Performance</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">ResidualCapacity[r,t,y]</td>
                                                <td class="hidden-xs"> ResidualCapacity defines capacity that was built before the start of the model period and is still in operation.  Over time, the ResidualCapacity should decrease as older plants are retired.  The model will then determine the best way to meet the demand when these older plants retire.</td>
                                            </tr>																
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAMaxC: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">TotalAnnualMaxCapacity[r,t,y]</td>
                                                <td class="hidden-xs">Total maximum existing (residual plus cumulatively installed) capacity allowed for a technology in a specified year.</td>
                                            </tr>												
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAMaxCI: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>				
                                            <tr>
                                                <td class="v-align-m">TotalAnnualMaxCapacityInvestment[r,t,y]</td>
                                                <td class="hidden-xs">The maximum allowable capacity addition (investment) for a technology in a year (i.e. the new capacity added must be lower than the specified amount). Can for instance be used to represent supply chain or construction capacity limitations than limit the speed at which new capacity can be built.</td>
                                            </tr>	
											
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAMinC: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">TotalAnnualMinCapacity[r,t,y]</td>
                                                <td class="hidden-xs"> The minimum allowable total capacity for a technology in the given year (i.e. the total capacity must be greater than the specified amount). Can for instance be used to represent policy targets for total capacity.</td>
                                            </tr>	
											
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAMinCI:{
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">TotalAnnualMinCapacityInvestment[r,t,y]</td>
                                                <td class="hidden-xs">The minimum allowable capacity addition (investment) for a technology in a year (i.e. the new capacity added must be greater than the specified amount). Can for instance be used to represent planned additions, such as construction projects already under way, or minimum policy targets for new capacity.</td>
                                            </tr>												
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAL:{
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">TotalTechnologyAnnualActivityLowerLimit [r, t, y]</td>
                                                <td class="hidden-xs">The minimum allowable cumulative activity for a technology in a year (i.e. the sum of activity in all modes of operation in the year must be greater than the value specified here). Can for instance be used to represent minimum policy targets for technology utilization, such as renewable energy mandates.</td>
                                            </tr>												
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAU:{
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">TotalTechnologyAnnualActivityUpperLimit [r, t, y]</td>
                                                <td class="hidden-xs">The maximum allowable cumulative activity for a technology in a year (i.e. the sum of activity in all modes of operation in the year must be lower than the value specified here). Can for instance be used to represent resources that have a fixed limitation on use (e.g. land resources)</td>
                                            </tr>												
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        RMTT:{
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Reserve margin</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">ReserveMarginTagTechnology[r,t,y]	</td>
                                                <td class="hidden-xs">Indicator that the capacity of a technology can be used to meet capacity reserve requirements.</td>
                                            </tr>													
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        RTT:{ 


            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
    
    
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>RE Generation target</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">RETagTechnology[r,t,y]	</td>
                                                <td class="hidden-xs">Used to specify the technologies which can contribute towards meeting a renewable energy target (set with 'REMinProductionTarget'). </td>
                                            </tr>													
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>
            `
        },
        COTU: {


            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>RE Generation target</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">CapacityOfOneTechnologyUnit [r, t, y]</td>
                                                <td class="hidden-xs">CapacityOfOneTechnologyUnit is used to specify the discrete units of capacity by which a technology can be increased. For instance, a value of '10' specifies that the NewCapacity of a technology in a year must be a multiple of '10' (0, 10, 20, 30 …)</td>
                                            </tr>													
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>
            `
        }

    },
    RYTM: {
        VC: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Technology costs</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">VariableCost[r,t,m,y]</td>
                                                <td class="hidden-xs"> Cost of a technology for a given mode of operation (Variable O&M cost), per unit of activity. </td>
                                            </tr>																
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAMLL: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Performance</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">TechnologyActivityByModeLowerLimit [r, t, m, y]</td>
                                                <td class="hidden-xs">The minimum allowable cumulative activity for a technology in a year (i.e. the sum of activity in all modes of operation in the year must be greater than the value specified here). Can for instance be used to represent resources that have a fixed limitation on use (e.g. land resources).</td>
                                            </tr>																
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAMUL: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="v-align-m">TechnologyActivityByModeUpperLimit [r, t, m, y]</td>
                                                <td class="hidden-xs">The maximum allowable cumulative activity for a technology in a year (i.e. the sum of activity in all modes of operation in the year must be lower than the value specified here). Can for instance be used to represent resources that have a fixed limitation on use (e.g. land resources).</td>
                                            </tr>												
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TADML: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>				
                                            <tr>
                                                <td class="v-align-m">TechnologyActivityDecreaseByModeLimit [r, t, m, y]</td>
                                                <td class="hidden-xs">The maximum decrease in activity in a specific mode of operation that can occur between one year and the next, expressed as a fraction. For example, if the TechnologyActivityDecreaseByModeLimit is set to 0.1 for mode of operation 1 of a technology, then the activity in that mode for year n+1 cannot be less than 90% of what it was in year n (i.e. 10% lower). Can for instance be used to represent market inertia that limits the shift away from technologies that are not cost effective.</td>
                                            </tr>	
											
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        },
        TAIML: {
            title: `Year & technology parameters`,
            definition:
                `
                <article class="col-xs-12 col-sm-12">
                    <div class="jarviswidget" id="wid-id-5" 
                            data-widget-colorbutton="false"	
                            data-widget-editbutton="false" 
                            data-widget-togglebutton="false" 
                            data-widget-deletebutton="false" 
                            data-widget-fullscreenbutton="false" 
                            data-widget-custombutton="false" 
                            data-widget-collapsed="false" 
                            data-widget-sortable="false">
                        <header>
                            <h2>Capacity constraints</h2>				
                        </header>
                        <div>
                            <div class="widget-body no-padding">
                                <div class="table-responsive no-margin custom-scroll" >             
                                    <table class="table highlight table-border-0 table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th class="hidden-xs" colspan="2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>	
                                            <tr>
                                                <td class="v-align-m">TechnologyActivityIncreaseByModeLimit [r, t, m, y]</td>
                                                <td class="hidden-xs"> he maximum increase in activity in a specific mode of operation that can occur between one year and the next, expressed as a fraction . For example, if the TechnologyActivityIncreaseByModeLimit is set to 0.05 for mode of operation 1 of a technology, then the activity in that mode for year n+1 cannot be more than 105% of what it was in year n (i.e. 5% higher). Can for instance be used to represent market inertia that limits the shift away to new and more cost effective technologies.</td>
                                            </tr>	
											
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>            
                    </div>
                </article>`
        }
    },
    RYTCM: {
        IAR:{
            title: `Year & technology & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Performance</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">InputActivityRatio[r,t,f,m,y]</td>
                                            <td class="hidden-xs">InputActivityRatio defines the quantity of each input commodity required by a technology for a given amount of activity.  Combined with the OutputActivityRatio this defines the overall efficiency of a technology as Efficiency = OutputActivityRatio/InputActivityRatio.</td>
                                        </tr>		
									
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article> 
            `
        },
        OAR:{
            title: `Year & technology & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Performance</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td class="v-align-m">OutputActivityRatio[r,t,f,m,y]</td>
                                            <td class="hidden-xs">OutputActivityRatio defines the rate of production of a commodity by a technology.  Combined with the InputActivityRatio this defines the overall efficiency of a technology as Efficiency = OutputActivityRatio/InputActivityRatio.  For most power plants the output activity ratio is set to 1 (a 1 GW power plant can output 1 GW at full capacity) and then the efficiency is set by the InputActivityRatio.</td>
                                        </tr>									
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article> 
            `
        }

    },
    RYTC:{
        INCR: {
            title: `Year & technology & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Performance</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">InputToNewCapacityRatio [r, t, f, y]</td>
                                            <td class="hidden-xs">Used to set the ratio between the use of commodity by a technology to the new capacity of that technology installed in a year. It can be used to represent materials required for the construction of a new powerplant, for instance.</td>
                                        </tr>		
									
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article> 
            `
        },
        ITCR:{
            title: `Year & technology & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Performance</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>	
                                        <tr>
                                            <td class="v-align-m">InputToTotalCapacityRatio [r, t, f, y]</td>
                                            <td class="hidden-xs">Used to set the ratio between the use of commodity by a technology to the total capacity of that technology existing in a year. It can be used to represent land area required by a wind or solar farm, for instance.</td>
                                        </tr>									
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article> 
            `
        }

    },
    RYC: {
        AAD: {
            title: `Year & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Demands</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td class="v-align-m">AccumulatedAnnualDemand[r,f,y]</td>
                                            <td class="hidden-xs">Annual demand for a commodity. Unlike SpecifiedAnnualDemand, AccumulatedAnnualDemand needs to be met only for each year but not each timeslice.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>`
        },
        SAD: {
            title: `Year & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Demands</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="v-align-m">SpecifiedAnnualDemand[r,f,y]</td>
                                        <td class="hidden-xs">Total specified demand for the year, linked to a specific ‘time of use’ during the year.</td>
                                    </tr>												
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>`
        },
        RTF:{
            title: `Year & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>RE Generation target</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">RETagFuel[r,f,y]</td>
                                            <td class="hidden-xs">Used to specify the commodity to which a renewable energy target (set with 'REMinProductionTarget') is applied.</td>
                                        </tr>
                                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div> 
            </article>
            `
        },
        RMTF: {
            title: `Year & commodity parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Reserve margin</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">ReserveMarginTagFuel[r,f,y]</td>
                                            <td class="hidden-xs">Indicator that a reserve margin requirement should be applied for the commodity. Usually used for electricity commodities to ensure that sufficient power generation capacity is in place to meet peak demand.</td>
                                        </tr>
                                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div> 
            </article>
            `
        }
    },
    RYE: {
        AEL:{
            title: `Year & emission parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Emissions</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">AnnualEmissionLimit[r,e,y]</td>
                                            <td class="hidden-xs">Limit on total annual emissions of a specified type of emission (e.g. CO2, NOx). This limit is applied to the combined total of endogenously (i.e. decided by the model) and exogenously (i.e. decided by the user) produced emissions.</td>
                                        </tr>								
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        },
        EP: {
            title: `Year & emission parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Emissions</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>	
                                        <tr>
                                            <td class="v-align-m">EmissionsPenalty[r,e,y]</td>
                                            <td class="hidden-xs">EmissionsPenalty defines the cost applied to emissions within the model.</td>
                                        </tr>									
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        },
        AEE: {
            title: `Year & emission parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Emissions</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>	
                                        <tr>
                                            <td class="v-align-m">AnnualExogenousEmission[r,e,y]</td>
                                            <td class="hidden-xs">Emissions that are not linked to activity of any technologies in the model, but specified directly by the user. Usually used to represent emissions from activities that are not  represented in the model.</td>
                                        </tr>	
          							
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RYTs: {
        YS: {
            title: `Year & timeslice parameter`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
                
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Global parameters</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">YearSplit[l,y]</td>
                                            <td class="hidden-xs">The duration of a time slice expressed as a fraction of a year. Derived by dividing the number of hours in the time slice by the number of     The sum of YearSplits for all time slices in a model should sum to one.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>       
            `
        }

    },
    RYTTs: {
        CF:{
            title: `Year & technology & timeslice parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
            
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Performance</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">CapacityFactor[r,t,l,y]</td>
                                            <td class="hidden-xs">CapacityFactor is the fraction of technology's capacity that can be used in each timeslice. Used when the availability of a technology varies with time of year or time of day. For example, a solar panel would have a very low or zero capacity factor in a nighttime timeslice.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>
            `
        }

    },
    RYCTs: {
        SDP:{
            title: `Year & commodity & timeslice parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
            
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Demands</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">SpecifiedDemandProfile [r, f, l, y]</td>
                                            <td class="hidden-xs">The fraction of the SpecifiedAnnualDemand that must be met in a given timeslice.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>
            `
        }

    },
    RYTEM: {
        EAR:{
            title: `Year & technology & emission parameters`,
            definition:
                `
            <article class="col-xs-12 col-sm-12">
            
                <div class="jarviswidget" id="wid-id-5" 
                    data-widget-colorbutton="false"	
                    data-widget-editbutton="false" 
                    data-widget-togglebutton="false" 
                    data-widget-deletebutton="false" 
                    data-widget-fullscreenbutton="false" 
                    data-widget-custombutton="false" 
                    data-widget-collapsed="false" 
                    data-widget-sortable="false">
                    <header>
                        <h2>Emissions</h2>				
                    </header>
                    <div>
                        <div class="widget-body no-padding">
                            <div class="table-responsive no-margin custom-scroll" >             
                                <table class="table highlight table-border-0 table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="hidden-xs" colspan="2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-m">EmissionActivityRatio[r,t,e,m,y]</td>
                                            <td class="hidden-xs">EmissionActivityRatio defines the quantity of a given emission per unit of activity of each technology analogous to OutputActivityRatio.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
            </article>
            `
        }

    }
}