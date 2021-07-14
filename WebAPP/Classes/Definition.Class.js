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
    R: {
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
                                        <td class="hidden-xs">Region specific value for the discount rate, expressed in decimals (e.g. 0.05)</td>
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
    RY: {
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
                                        <td class="hidden-xs">Minimum level of the reserve margin required to be provided for all the tagged commodities, by the tagged technologies. If no reserve margin is required, the parameter will have value 1; if, for instance, 20% reserve margin is required, the parameter will have value 1.2.</td>
                                    </tr>													
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>            
            </div>
        </article>      
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
                                    <td class="v-align-m">REMinProductionTarget[r,y]	</td>
                                    <td class="hidden-xs">Minimum ratio of all renewable commodities tagged in the RETagCommodity parameter, to be produced by the technologies tagged with the RETechnology parameter.</td>
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
    RT: {
        title: `Technology parameter`,
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
                                        <td class="hidden-xs">Total maximum level of activity allowed for a technology in the entire modelled period.</td>
                                    </tr>	
                                    <tr>
                                        <td class="v-align-m">TotalTechnologyModelPeriodActivityLowerLimit[r,t]</td>
                                        <td class="hidden-xs">Total minimum level of activity allowed for a technology in the entire modelled period.</td>
                                    </tr>												
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>            
            </div>
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
                                        <td class="v-align-m">CapacityToActivityUnit[r,t]</td>
                                        <td class="hidden-xs">Conversion factor relating the energy that would be produced when one unit of capacity is fully used in one year.</td>
                                    </tr>	
                                    <tr>
                                        <td class="v-align-m">OperationalLife[r,t]</td>
                                        <td class="hidden-xs">Useful lifetime of a technology, expressed in years.</td>
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
    RE: {
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
    RYT: {
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
                                            <td class="hidden-xs">Capital investment cost of a technology, per unit of capacity.</td>
                                        </tr>	
                                        <tr>
                                            <td class="v-align-m">VariableCost[r,t,m,y]</td>
                                            <td class="hidden-xs"> Cost of a technology for a given mode of operation (Variable O&M cost), per unit of activity. </td>
                                        </tr>	
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
                                            <td class="hidden-xs">Maximum time a technology can run in the whole year, as a fraction of the year ranging from 0 to 1. It gives the possibility to account for planned outages.</td>
                                        </tr>	
                                        <tr>
                                            <td class="v-align-m">ResidualCapacity[r,t,y]</td>
                                            <td class="hidden-xs"> Remained capacity available from before the modelling period. </td>
                                        </tr>																
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
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
                                            <td class="v-align-m">AvailabilityTotalAnnualMaxCapacity[r,t,y]</td>
                                            <td class="hidden-xs">Total maximum existing (residual plus cumulatively installed) capacity allowed for a technology in a specified year.</td>
                                        </tr>	
                                        <tr>
                                            <td class="v-align-m">TotalAnnualMinCapacity[r,t,y]</td>
                                            <td class="hidden-xs"> Total minimum existing (residual plus cumulatively installed) capacity allowed for a technology in a specified year.</td>
                                        </tr>	
                                        <tr>
                                            <td class="v-align-m">CapacityOfOneTechnologyUnit[r,t,y]</td>
                                            <td class="hidden-xs">Capacity of one new unit of a technology. In case the user sets this parameter, the related technology will be installed only in batches of the specified capacity and the problem will turn into a Mixed Integer Linear Problem. </td>
                                        </tr>				
                                        <tr>
                                            <td class="v-align-m">TotalAnnualMaxCapacityInvestment[r,t,y]</td>
                                            <td class="hidden-xs">Maximum capacity of a technology, expressed in power units.</td>
                                        </tr>	
                                        <tr>
                                            <td class="v-align-m">TotalAnnualMinCapacityInvestment[r,t,y]</td>
                                            <td class="hidden-xs">Minimum capacity of a technology, expressed in power units. </td>
                                        </tr>												
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>
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
                                            <td class="hidden-xs">Binary parameter tagging the technologies that are allowed to contribute to the reserve margin. It has value 1 for the technologies allowed, 0 otherwise.</td>
                                        </tr>													
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>            
                </div>

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
                                            <td class="hidden-xs">Binary parameter tagging the renewable technologies that must contribute to reaching the indicated minimum renewable production target. It has value 1 for thetechnologies contributing, 0 otherwise.</td>
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
    RYTC: {
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
                                        <td class="hidden-xs">Rate of use of a commodity by a technology, as a ratio of the rate of activity.</td>
                                    </tr>		
                                    <tr>
                                        <td class="v-align-m">OutputActivityRatio[r,t,f,m,y]</td>
                                        <td class="hidden-xs">Rate of commodity output from a technology, as a ratio of the rate of activity.</td>
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
    RYC: {
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
                                        <td class="v-align-m">TradeRoute[r,rr,f,y]</td>
                                        <td class="hidden-xs">Binary parameter defining the links between region r and region rr, to enable or disable trading of a specific commodity. It has value 1 when two regions are linked, 0 otherwise.</td>
                                    </tr>
												
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>            
            </div> 
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
                                    <tr>
                                        <td class="v-align-m">AccumulatedAnnualDemand[r,f,y]</td>
                                        <td class="hidden-xs">Accumulated Demand for a certain commodity in one specific year. It cannot be defined for a commodity if its SpecifiedAnnualDemand for the same year is already defined and vice versa.</td>
                                    </tr>													
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>            
            </div>
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
                                        <td class="hidden-xs">Binary parameter tagging the fuels to which the reserve margin applies. It has value 1 if the reserve margin applies to the fuel, 0 otherwise.</td>
                                    </tr>
                                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>            
            </div> 
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
                                        <td class="hidden-xs">Binary parameter tagging the fuels to which the renewable target applies to. It has value 1 if the target applies, 0 otherwise.</td>
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
    RYE: {
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
                                        <td class="hidden-xs">Annual upper limit for a specific emission generated in the whole modelled region.</td>
                                    </tr>		
                                    <tr>
                                        <td class="v-align-m">EmissionsPenalty[r,e,y]</td>
                                        <td class="hidden-xs">Penalty per unit of emission.</td>
                                    </tr>		
                                    <tr>
                                        <td class="v-align-m">AnnualExogenousEmission[r,e,y]</td>
                                        <td class="hidden-xs">It allows the user to account for additional annual emissions, on top of those computed endogenously by the model (e.g. emissions generated outside the region).</td>
                                    </tr>	
                                    <tr>
                                        <td class="v-align-m">ModelPeriodExogenousEmission[r,e]</td>
                                        <td class="hidden-xs">It allows the user to account for additional emissions over the entire modelled period, on top of those computed endogenously by the model (e.g. generated outside the region).</td>
                                    </tr>	
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
    RYTs: {
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
                                        <td class="hidden-xs">Duration of a modelled time slice, expressed as a fraction of the year. The sum of each entry over one modelled year should equal 1.</td>
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
    RYTTs: {
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
                                        <td class="hidden-xs">Capacity available per each TimeSlice expressed as a fraction of the total installed capacity, with values ranging from 0 to 1. It gives the possibility to account for forced outages.</td>
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
    RYCTs: {
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
                                        <td class="v-align-m">SpecifiedAnnualDemand[r,f,y]</td>
                                        <td class="hidden-xs">Total specified demand for the year, linked to a specific ‘time of use’ during the year.</td>
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
    RYTE: {
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
                                        <td class="hidden-xs">Emission factor of a technology per unit of activity, per mode of operation.</td>
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