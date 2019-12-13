import React, { Component } from 'react';

import Axios from 'axios'
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import Pagination from '../Pagination';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const $ = window.$;


const data =
    [
        {
            "label": "Executive",

            "checked": false,
            "children": [

                { "label": "CEO/COO/CFO/CIO/CTO/Other" },
                { "label": "Manager (Sales/Marketing)" },
                { "label": "Manager (Administration)" },
                { "label": "Manager (Other)" },

            ]

        },
        {
            "label": "IT (pc,Web,Unix)",

            "checked": false,
            "children": [

                { "label": "Project Manager" },
                { "label": "Business Application SE" },
                { "label": "ERP,SCM,CRM Architect" },
                { "label": "Web Application SE" },
                { "label": "Database SE" },
                { "label": "Programmer" },
                { "label": "QA/Quality/Control/Testing Engineer" }

            ]

        },
        {
            "label": "IT (Mainframe)",

            "checked": false,
            "children": [

                { "label": "Project Manager" },
                { "label": "Application SE" },
                { "label": "Database SE" },
                { "label": "Programmer" },
                { "label": "QA/Quality/Control/Testing Engineer" }

            ]
        },
        {
            "label": "IT (Hardware/Network)",

            "checked": false,
            "children": [

                { "label": "Project Manager" },
                { "label": "Network Engineer" },
                { "label": "Security System SE" },
                { "label": "Server Architect and Developer" },
                { "label": "Server and Machine Operation and Maintenance" },
                { "label": "Network Monitoring" },
                { "label": "Communication Infrastructure (Including ISP and Career)" }

            ]
        },
        {
            "label": "IT (Embedded Software, Control Systems)",

            "checked": false,
            "children": [

                { "label": "Project Manager" },
                { "label": "Software Architecture" },
                { "label": "Programmer" },
            ]
        },
        {
            "label": "IT (Other)",

            "checked": false,
            "children": [

                { "label": "Project Manager" },
                { "label": "OS Development" },
                { "label": "Product Localization" },
                { "label": "Communication Software Development" },
                { "label": "Presales" },
                { "label": "Sales Engineer" },
                { "label": "Design/CAD Design/CAD Operator" },
                { "label": "Customer Support Engineer" },
                { "label": "In-house System Operator" },
                { "label": "IT Help Desk" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Electronics (Appliance/Semiconductor)",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Project/Production Manager" },
                { "label": "Design/CAD Design/CAD Operator" },
                { "label": "Production Engineering" },
                { "label": "Sales Engineer/Service Engineer" },
                { "label": "Control - Software Architect" },
                { "label": "Control - Programmer" },
                { "label": "Basic Research and Development" },
                { "label": "Valuation/Testing" },
                { "label": "Production Control" },
                { "label": "Quality Control" },
                { "label": "Plant Management" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Manufacturing (Automobile/Plant Engineering/Precision Equipment)",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Project/Production Manager" },
                { "label": "Architect/CAD Architect/CAD Operator/Plant Architect" },
                { "label": "Production Engineer" },
                { "label": "Sales Engineer/Service Engineer" },
                { "label": "Control - Software Architect" },
                { "label": "Control - Programmer" },
                { "label": "Basic Research and Development" },
                { "label": "Valuation/Testing" },
                { "label": "Production Control" },
                { "label": "Quality Control" },
                { "label": "Plant Management" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Medical/Pharmaceutical/Bio/Fabric/Food",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Research" },
                { "label": "Production R & D" },
                { "label": "Clinical R & D" },
                { "label": "Patent" },
                { "label": "Pharmacist" },
                { "label": "Valuation/Testing" },
                { "label": "QA/QC" },
                { "label": "Manufacturing Technology/Manufacturing Management" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Building/Construction/Equipment/Real Estate",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Engineer (Building/Construction/Equipment)" },
                { "label": "Construction Management (Building/Construction/Equipment/Architecture)" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Consulting",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Businesss Consulting" },
                { "label": "IT System Consulting" },
                { "label": "IT Security Consulting" },
                { "label": "IT Network Consulting" },
                { "label": "IT Consulting (Other)" },
                { "label": "Reruitment Consulting" },
                { "label": "HR Consulting" },
                { "label": "Business Strategy Consulting" },
                { "label": "Financial Consulting" },
                { "label": "Marketing and PR Consulting" },
                { "label": "Other" }
            ]
        },
        {
            "label": "General Affairs/HR/Legal",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "General Affairs" },
                { "label": "HR (Recruiting)" },
                { "label": "HR (Payroll/Benefits)" },
                { "label": "IT Network Consulting" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Legal",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Legal (Compliance Officers)" },
                { "label": "Legal(Contract Manager)" },
                { "label": "Legal (Documentation)" },
                { "label": "Legal Support" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Finance/Accounting",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Accounting" },
                { "label": "Analysis & Planning" },
                { "label": "Audit & Risk Management" },
                { "label": "CPA/Certified Tax Accountant" },
                { "label": "Accounting/Finance" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Administrative",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "International Affairs" },
                { "label": "International Trading" },
                { "label": "Logistics/Materials & Purchase Control" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Customer Service",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Telemarketing/Telesales" },
                { "label": "Call Centre Manager" },
                { "label": "Customer Support" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Finance/Bank/Securities",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Asset Management/Trust Banking" },
                { "label": "Commercial/Private/Corporate Banking" },
                { "label": "Research(Business/Market/Trust)" },
                { "label": "Other" }
            ]
        },
        {
            "label": "Insurance",

            "checked": false,
            "children": [

                { "label": "All" },
                { "label": "Actuary" },
                { "label": "Booking" },
                { "label": "Claims/underwriting" },
                { "label": "Other" }
            ]
        }

    ];

const onChange = (currentNode, selectedNodes) => {
    console.log('onChange::', currentNode, selectedNodes)
}
const onAction = (node, action) => {
    console.log('onAction::', action, node)
}
const onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
}

const lookup = {
    "int": [
        { id: '1', text: 'Country' },
        { id: '2', text: 'Japan' },
        { id: '3', text: 'Bangladesh' },
        { id: '4', text: 'Afghanistan' },
        { id: '5', text: 'Korea' }
    ],
    "abc": [
        { id: 'a', text: 'United Kingdom' },
        { id: 'b', text: 'Albania' },
        { id: 'c', text: 'Armenia' },
        { id: 'd', text: 'Austria' },
        { id: 'e', text: 'Belgium' }
    ]
}


const User = () => {
    return (
        <div>
            <div className="form-row">
                <div className='form-group col-md-3'>
                    <select className="form-control" placeholder="Location" aria-describedby="area">
                        <option value="">Region</option>
                        <option value="1">Asia</option>
                        <option value="2">Europe</option>
                        <option value="3">North America</option>
                    </select>
                </div>
                <div className='form-group col-md-3'>
                    <select className="form-control" placeholder="country" aria-describedby="country">
                        <option value="" hidden>Country</option>
                        <option value="1">Bangladesh</option>
                        <option value="2">Canada</option>
                        <option value="3">America</option>
                    </select>
                </div>
                <div className='form-group col-md-3'>
                    <select className="form-control" placeholder="city" aria-describedby="city">
                        <option value="" hidden>City</option>
                        <option value="1">Chittagong</option>
                        <option value="2">Dhaka</option>
                        <option value="3">Rajshahi</option>
                        <option value="3">Barisal</option>
                        <option value="3">Comilla</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

const Language = () => {
    return (
        <div>
            <div className="form-row">
                <div className='form-group col-md-3'>
                    <select className="form-control" placeholder="All Languages" aria-describedby="area">
                        <option value="">All Languages</option>
                        <option value="1">English</option>
                        <option value="2">Japanese</option>
                        <option value="3">Chinese</option>
                        <option value="4">Korean</option>
                        <option value="5">Afrikaans</option>
                        <option value="6">Albanian</option>
                        <option value="7">Arabic</option>
                        <option value="8">Armenian</option>

                        <option value="9">Bengali</option>
                        <option value="10">Bosnian</option>
                        <option value="11">Bulgarian</option>
                        <option value="12">Burmese</option>
                        <option value="13">Croatian</option>
                        <option value="14">Czech</option>
                        <option value="15">Danish</option>
                        <option value="16">Dutch</option>
                        <option value="17">Estonian</option>
                        <option value="18">Finnish</option>
                        <option value="19">Flemish</option>2
                    <option value="20">French</option>
                        <option value="20">Georgian</option>
                        <option value="21">German</option>
                        <option value="22">Greek</option>
                        <option value="23">Hebrew</option>
                        <option value="24">Hindi</option>
                        <option value="25">Hungarian</option>
                        <option value="26">Indonesian</option>
                        <option value="27">Italian</option>
                        <option value="28">Kurdish</option>
                        <option value="29">Latvian</option>

                        <option value="30">Lithuanian</option>
                        <option value="30">Macedonian</option>
                        <option value="31">Malay</option>
                        <option value="32">Norwegian</option>
                        <option value="33">Persian</option>
                        <option value="34">Polish</option>
                        <option value="35">Portuguese</option>
                        <option value="36">Portuguese (Brazilian)</option>
                        <option value="37">Punjabi</option>
                        <option value="38">Romanian</option>
                        <option value="39">Russian</option>
                        <option value="40">Sanskrit</option>
                        <option value="41">Serbian</option>
                        <option value="42">Sinhalese</option>
                        <option value="43">Slovak</option>
                    </select>
                </div>
                <div className="form-group col-md-7 allLangWrap">
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="lanBasic1" name="languageAdd1" />
                        <label class="custom-control-label" for="lanBasic1">Basic</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="lanIntermediate1" name="languageAdd1" />
                        <label class="custom-control-label" for="lanIntermediate1">Intermediate</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="lanAdvanced1" name="languageAdd1" />
                        <label class="custom-control-label" for="lanAdvanced1">Advanced</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="lanBusiness1" name="languageAdd1" />
                        <label class="custom-control-label" for="lanBusiness1">Business</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="dailyConv1" name="languageAdd1" />
                        <label class="custom-control-label" for="dailyConv1">Daily Conversation</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="lanFluent1" name="languageAdd1" />
                        <label class="custom-control-label" for="lanFluent1">Fluent</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="lanNative1" name="languageAdd1" />
                        <label class="custom-control-label" for="lanNative1">Native</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

class jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobsBeforeDateFilter:[],
            period: 'all',
            employment_type: ['any'],
            companies: [],
            total: '',
            maximum: '',
            minimum: '',
            categories: '',
            company: [],
            totalPage: '',

            currentPage: '1',
            postsPerPage: 10,

            users: [],
            languages: [],
            showStore: false,
            dataValue: 'int',

            category: '',
            title: '',
            type: '',
            company: '',
            level: '',
            language: '',
            salary:'10000'
        }
        this.searchValueSubmit = this.searchValueSubmit.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
    }


    onChange = ({ target: { value } }) => {
        this.setState({ dataValue: value });
    }

    autoSelecta = () => {
        document.getElementById('autoSelecta')
    }

    btnTapped = () => {
        this.setState({ showStore: !this.state.showStore });
    }

    addLocation = () => {
        this.setState({
            users: [this.state.users, <User />]
        })
    }

    addLanguage = (i) => {
        console.log('I:', i)
        this.setState({
            languages: [this.state.languages, <Language />]
        })
    }

    searchValueSubmit = (e) => {
        e.preventDefault();
        let { title, category, type, company, level, language } = this.state
        let url = 'jobs?'
        if (company)
            url += '&company=' + company
        if (title)
            url += '&title=' + title
        if (category)
            url += '&category=' + category
        if (level)
            url += '&level=' + level
        if (type)
            url += '&type=' + type
        if (language)
            url += '&language=' + language

        url = url.replace('?&', '?')

        this.props.history.push(url)
        Axios.get(`/jobs`, {
            params: {
                title: title,
                category: category,
                type: type,
                company: company,
                level: level,
                language: language
            }
        })
            .then(response => {
                let getjob = []
                getjob = response.data.response.jobs
                let filterArray = getjob.filter(job => {
                    if (job.delete === '0') {
                        return true;
                    }
                    return false;
                });
                this.setState({
                    jobs: filterArray,
                    total: filterArray.length
                })
            })
            .catch(error => {
            })
    }

    setSearchValue = (e) => {
        e.preventDefault();
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    advanceSearch = () => {
        let { period, title, category, employment_type, maximum, minimum, company } = this.state
        Axios.get(`/jobs/adv-search`, {
            params: {
                title: title,
                period: period,
                type: employment_type,
                maximum: maximum,
                minimum: minimum,
                category: category,
                company: company
            }
        })
        .then(response => {
            let getjob = []
            getjob = response.data.response.jobs

            let filterArray = getjob.filter(job => {
                if (job.delete === 0) {
                    return true;
                }
                return false;
            });
            this.setState({
                jobs: filterArray,
                total: filterArray.length
            })
        })
        .catch(error => {
            console.log("Error: ", error.response)
        })
    }

    setAdvanceSearchValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        setTimeout(this.advanceSearch, 500)
    }

    doFilterByDate = (e) => {
        let period = e.target.value
        this.setState({
            [e.target.name]: e.target.value
        })
        let filterArray = this.state.jobs.filter(job => {
            if (new Date(job.createdAt) >= new Date(new Date().getTime()-(period *24*60*60*1000))) {
                return true;
            }
            return false;
        });
        this.setState({
            jobs: filterArray,
            total: filterArray.length
        })
    }

    
    filterBySalary = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        let salary = e.target.value.split('-');
        console.log(salary)
        let filterArray = this.state.jobs.filter(job => {
            if ((job.salary >= Number(salary[0])) &&(job.salary<=Number(salary[1])) ) {
                console.log({job})
                return true;
            }
            return false;
        })
        this.setState({
            jobs: filterArray,
            total: filterArray.length
        })
    }

    filterByExpericence  = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        let experience = e.target.value.match(/\d+/g).map(Number);
        console.log('experience',experience)
        if(experience.length>1){
            let filterArray = this.state.jobs.filter(job => {
                if ((job.experience >= Number(experience[0])) &&(job.experience<=Number(experience[1])) ) {
                    console.log({job})
                    return true;
                }
                return false;
            })
            this.setState({
                jobs: filterArray,
                total: filterArray.length
            })
        }else{
            let filterArray = this.state.jobs.filter(job => {
                if ((job.experience >= Number(experience[0])) ) {
                    console.log({job})
                    return true;
                }
                return false;
            })
            this.setState({
                jobs: filterArray,
                total: filterArray.length
            })
        }
    }


    filterByMinimum = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })

        let filterArray = this.state.jobs.filter(job => {
            if ( parseInt(job.salary) >= this.state.minimum) {
                return true;
            }
            return false;
        });
        this.setState({jobs:filterArray})
    }

    
    filterByMaximum = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })

        let filterArray = this.state.jobs.filter(job => {
            if ( parseInt(job.salary) <= this.state.maximum) {
                return true;
            }
            return false;
        });
        this.setState({jobs:filterArray})
    }

    setAdvanceSearchCheckboxValue = (e) => {
        if (this.state.employment_type.indexOf(e.target.value) == -1) {
            this.setState({ employment_type: [...this.state.employment_type, e.target.value] })
        } else {
            let items = this.state.employment_type
            items.splice(this.state.employment_type.indexOf(e.target.value), 1)
            this.setState({ employment_type: items })
        }
        setTimeout(this.advanceSearch, 500)
    }

    componentDidMount() {

        let params = (new URL(document.location)).searchParams;
        let title = params.get("title")
        this.setState({ title: title })
        let category = params.get("category")
        this.setState({ category: category })
        let company = params.get("company")
        this.setState({ company: company })
        let level = params.get("level")
        this.setState({ level: level })
        let type = params.get("type")
        this.setState({ type: type })
        let language = params.get("language")
        this.setState({ language: language })

        let url = 'jobs?'

        if (company)
            url += '&company=' + company
        if (title)
            url += '&title=' + title
        if (category)
            url += '&category=' + category
        if (level)
            url += '&level=' + level
        if (type)
            url += '&type=' + type
        if (language)
            url += '&language=' + language

        url = url.replace('?&', '?')

        console.log('URL:', url)

        Axios.get(`/${url}`)
            .then(response => {
                console.log('Jobs:', response.data.response.jobs)
                let getjob = []
                getjob = response.data.response.jobs
                console.log('getjob:', getjob)
                let filterArray = getjob.filter(job => {
                    if (job.delete === '0') {
                        return true;
                    }
                    return false;
                });
                this.setState({
                    jobs: filterArray,
                    total: filterArray.length
                })
            })
            .catch(error => {
            })

        Axios.get(`/jobs`)
            .then(response => {

                console.log('hello jobs', response)

            })

        Axios.get(`/companies`)
            .then(response => {
                this.setState({ companies: response.data.companies })
            })

        Axios.get(`http://cloudproduction.co.bd/jobs/public/api/category`)
            .then(response => {
                this.setState({ categories: response.data.categories })
            })
    }

    render() {
        const { items, selectedItems } = this.state;
        var ts = new Date();
        let { jobs } = this.state
        let indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        let currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNumber => this.setCurrentPage(pageNumber);

        this.setCurrentPage = (pageNumber) => {
            console.log('pageNumber', pageNumber)
            this.setState({
                currentPage: pageNumber
            })
        }


        const joblist = currentPosts.map((job,index)=>
        
                    <tr key={index} >
                        <td scope="row">
                            <img className="table-img" alt="" src="assets/images/about-img.png"/> 
                        </td>
                        <td>
                            <h2 className="loop-item-title"> <Link to={`/jobs/${job._id}/${job.slug}`}>{ job.title ? job.title : 'no title yet'} </Link></h2>
                            <span className="job-company">{job.category}</span>
                        </td>
                        <td>
                            <span className="job-type contract">
                            <i className="fa fa-bookmark"></i> {job.company_name ? job.company_name : 'null' }
                            </span>
                       </td>
                      
                       
                        <td>
                            <span className="job-type contract">
                            <i className="fa fa-bookmark"></i> {job.jobType ? job.jobType : 'null' }
                            </span>
                       </td>
                       
                        {/* <td>
                                <span className="job-location">
                                <i className="fa fa-map-marker"></i><em>{job.job_location ?  job.job_location : 'null'}</em>
                                </span>
                        </td> */}
                        <td>
                            <span>
                                <time className="entry-date" dateTime="2015-08-18T01:40:23+00:00">
                                    <i className="fa fa-calendar"></i>  { new Date(job.createdAt).toLocaleDateString() }
                                </time> 
                            </span>
                        </td>
                        <td>
                        {/* <td> <Link to={`/jobs/${job._id}/${job.slug}`} className="btn btn-sm btn-success btn-rounded view-more">View More</Link> */}
                        <Link to={`/jobs/${job._id}/${job.slug}`}  data-toggle="tooltip" data-placement="bottom" title="View Profile" class="btn btn-cyan btn-xs adminEdIcon"><i class="fas fa-eye"></i></Link>
                        </td>
                    </tr>
        )

        const { dataValue } = this.state;
        const options = lookup[dataValue]

        var resultAd =
            <div className="form-row" id="autoSelecta">
                <div className='form-group col-md-3'>
                    <select onChange={this.onChange} className="form-control" placeholder="Location" aria-describedby="area">
                        <option value="int">Region</option>
                        <option value="abc">Europe</option>
                    </select>
                </div>


                <div className='form-group col-md-3'>
                    <select className="form-control" placeholder="country" aria-describedby="country">
                        {options.map(o => <option key={o.id} value={o.id}> {o.text} </option>)}
                    </select>

                </div>
                <div className='form-group col-md-3'>
                    <select className="form-control" placeholder="city" aria-describedby="city">
                        <option value="" hidden>City</option>
                        <option value="1">Chittagong</option>
                        <option value="2">Dhaka</option>
                        <option value="3">Rajshahi</option>
                        <option value="3">Barisal</option>
                        <option value="3">Comilla</option>
                    </select>
                </div>
                <div className='form-group col-md-3'>
                    <button type="button" className="btn btn-cyan btn-sm clickBtnAdd" id="clicKAddMore" onClick={this.addLocation}><i class="fas fa-plus pr-1"></i>Add</button>
                </div>
            </div>

        const advanceSearchUI =
            <div className="borTop" style={{ display: this.state.showStore ? 'block' : 'none' }}>
                <div className="form-row">
                    <div className='form-group col-md-3'>
                        <select className="form-control" placeholder="All Languages" aria-describedby="area">
                            <option value="">All Languages</option>
                            <option value="1">English</option>
                            <option value="2">Japanese</option>
                            <option value="3">Chinese</option>
                            <option value="4">Korean</option>
                            <option value="5">Afrikaans</option>
                            <option value="6">Albanian</option>
                            <option value="7">Arabic</option>
                            <option value="8">Armenian</option>
                            <option value="9">Bengali</option>
                            <option value="10">Bosnian</option>
                            <option value="11">Bulgarian</option>
                            <option value="12">Burmese</option>
                            <option value="13">Croatian</option>
                            <option value="14">Czech</option>
                            <option value="15">Danish</option>
                            <option value="16">Dutch</option>
                            <option value="17">Estonian</option>
                            <option value="18">Finnish</option>
                            <option value="19">Flemish</option>2
                            <option value="20">French</option>
                            <option value="20">Georgian</option>
                            <option value="21">German</option>
                            <option value="22">Greek</option>
                            <option value="23">Hebrew</option>
                            <option value="24">Hindi</option>
                            <option value="25">Hungarian</option>
                            <option value="26">Indonesian</option>
                            <option value="27">Italian</option>
                            <option value="28">Kurdish</option>
                            <option value="29">Latvian</option>
                            <option value="30">Lithuanian</option>
                            <option value="30">Macedonian</option>
                            <option value="31">Malay</option>
                            <option value="32">Norwegian</option>
                            <option value="33">Persian</option>
                            <option value="34">Polish</option>
                            <option value="35">Portuguese</option>
                            <option value="36">Portuguese (Brazilian)</option>
                            <option value="37">Punjabi</option>
                            <option value="38">Romanian</option>
                            <option value="39">Russian</option>
                            <option value="40">Sanskrit</option>
                            <option value="41">Serbian</option>
                            <option value="42">Sinhalese</option>
                            <option value="43">Slovak</option>
                        </select>
                    </div>
                    <div className="form-group col-md-7 allLangWrap">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="lanBasicNc" name="languageAdd" />
                            <label class="custom-control-label" for="lanBasicNc">Basic</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="lanIntermediateNc" name="languageAdd" />
                            <label class="custom-control-label" for="lanIntermediateNc">Intermediate</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="lanAdvancedNc" name="languageAdd" />
                            <label class="custom-control-label" for="lanAdvancedNc">Advanced</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="lanBusinessNc" name="languageAdd" />
                            <label class="custom-control-label" for="lanBusinessNc">Business</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="lanFluentNc" name="languageAdd" />
                            <label class="custom-control-label" for="lanFluentNc">Fluent</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="lanNativeNc" name="languageAdd" />
                            <label class="custom-control-label" for="lanNativeNc">Native</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="dailyConvNc" name="languageAdd" />
                            <label class="custom-control-label" for="dailyConvNc">Daily Conversation</label>
                        </div>
                    </div>
                    <div className='form-group col-md-2'>
                        <button type="button" className="btn btn-cyan btn-sm clickBtnAdd" onClick={() => this.addLanguage(10)}><i class="fas fa-plus pr-1"></i>Add</button>
                    </div>
                </div>
                {this.state.languages}
                <div className="form-row bTcm">
                    <div className='form-group col'>
                        <label for="exampleFormControlSelect1" className="boldLabel">Special Features</label>
                        <div className="adcustomCheck">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline1" />
                                <label class="custom-control-label" for="defaultInline1">Int. Transfer</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline2" />
                                <label class="custom-control-label" for="defaultInline2">No Transfer</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline3" />
                                <label class="custom-control-label" for="defaultInline3">New Graduate Welcome</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline4" />
                                <label class="custom-control-label" for="defaultInline4">Female Applicants Welcome</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline5" />
                                <label class="custom-control-label" for="defaultInline5">Technical Degree</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline6" />
                                <label class="custom-control-label" for="defaultInline6">Associate Degree</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row bTcm">
                    <div className='form-group col'>
                        <label for="exampleFormControlSelect1" className="boldLabel">Others</label>
                        <div className="adcustomCheck">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline11" />
                                <label class="custom-control-label" for="defaultInline11">HR Specialists</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline21" />
                                <label class="custom-control-label" for="defaultInline21">Accounting Specialists</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline31" />
                                <label class="custom-control-label" for="defaultInline31">IT Specialists</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline41" />
                                <label class="custom-control-label" for="defaultInline41">Audit Specialists</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline51" />
                                <label class="custom-control-label" for="defaultInline51">C.A</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline61" />
                                <label class="custom-control-label" for="defaultInline61">Executive & Management</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline71" />
                                <label class="custom-control-label" for="defaultInline71">Medical & Pharma</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline81" />
                                <label class="custom-control-label" for="defaultInline81">Marketing</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline91" />
                                <label class="custom-control-label" for="defaultInline91">Sales</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline100" />
                                <label class="custom-control-label" for="defaultInline100">Finance</label>
                            </div>
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="defaultInline101" />
                                <label class="custom-control-label" for="defaultInline101">Statistics</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row bTcm">
                    <div className="form-group col">
                        <label for="exampleFormControlSelect1" className="boldLabel">Need Visa Support</label>
                        <div className="adRadVisa">
                            <div className="form-group col">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="needVisaSupportYes" name="needVisaSupport" />
                                    <label class="custom-control-label" for="needVisaSupportYes">Yes</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="needVisaSupportNo" name="needVisaSupport" />
                                    <label class="custom-control-label" for="needVisaSupportNo">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row bTcm">
                    <div className="form-group col">
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="defaultInlineOver" />
                            <label class="custom-control-label boldLabel" for="defaultInlineOver">Overseas Application Ok</label>
                        </div>
                    </div>
                </div>
            </div>

        return (
            <div>
                <section className="top-job">
                    <div className="container">
                        <section className="pagination-header">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="vacency-header-left">
                                            <div className="btn btn-success btn-rounded view-more">{this.state.total}</div>
                                            <div className="top-vacency-left">
                                                <h6 className="match-job-title">According to your search criteria available jobs are shown in below.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    </div>
                                </div>
                            </div>
                        </section>
                        <h4 className="mb-3 mt-3">Jobs Search</h4>
                        <div className="row adrow">
                            <div className="col-md-8 col-lg-10 adfirstLeft">
                                <form className="advanceSearchForm">
                                    <div className="form-row">
                                        <div className='form-group col col-12 col-md-4 jobCatAd'>
                                            <input type="text" class="form-control" placeholder="Keywords" value={this.state.title} name="title" onChange={this.setSearchValue} />
                                        </div>

                                        <div className='form-group col col-12 col-md-4'>
                                            <select onChange={this.setSearchValue} name="level" value={this.state.level} className="form-control" placeholder="Location" aria-describedby="MaterialButton-addon2">
                                                <option value="">Job Level </option>
                                                <option value="Entry">Entry Level</option>
                                                <option value="Mid">Medium Level</option>
                                                <option value="Senior">Senior Level</option>
                                            </select>
                                        </div>
                                        <div className='form-group col col-12 col-md-4'>
                                            <select onChange={this.setSearchValue} name="type" value={this.state.type} className="form-control" placeholder="Job Type" aria-describedby="MaterialButton-addon2">
                                                <option value="">Job Type</option>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                                <option value="Contractual">Contractual</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className='form-group col col-12 col-md-4'>
                                            <select onChange={this.setSearchValue} name="language" className="form-control" placeholder="Location" aria-describedby="MaterialButton-addon2">
                                                <option value="">Language</option>
                                                <option value="English">English</option>
                                                <option value="Japanese">Japanese</option>
                                                <option value="Bangla">Bangla</option>
                                            </select>
                                        </div>
                                        <div className='form-group col'>
                                            <DropdownTreeSelect texts={{ placeholder: 'Select Job Category' }} data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
                                        </div>
                                    </div>
                                    {resultAd}
                                    {this.state.users}
                                    {advanceSearchUI}
                                </form>
                            </div>
                            <div className="col-md-4 col-lg-2 adfirstRight">
                                <div className='form-group col'>
                                    <div className="input-group-append">
                                        <button className="btn btn-md btn-rounded banwidt m-0 px-3" onClick={(e) => this.searchValueSubmit(e)} type="submit">Search</button>
                                    </div>

                                </div>
                                <div className="form-group col">
                                    <button className="btn btn-light btn-rounded btn-md m-0 px-3 advSe-btn" onClick={this.btnTapped} style={{ width: '100%', backgroundcolor: '#fff' }} type="submit">Advanced Search</button>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-3 wrapOfinfo">
                                <div className="card infOfUsers">
                                    <div className="card-header infOfUsers-cHeader">
                                        <h5>Filters</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="radio-button-filter common-border after-border cmFont">
                                            <h6 className="common-font-weight-bold">Date Posted</h6>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" className="custom-control-input" id="pastAll" name="period" checked={this.state.period == "all"} onChange={this.doFilterByDate} value="all" />
                                                <label className="custom-control-label" htmlFor="pastAll">All</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" className="custom-control-input" id="pastHour" name="period" checked={this.state.period == "1"} onChange={this.doFilterByDate} value="1" />
                                                <label className="custom-control-label" htmlFor="pastHour">24 hours</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" className="custom-control-input" id="past3day" name="period" checked={this.state.period == "3"} onChange={this.doFilterByDate} value="3" />
                                                <label className="custom-control-label" htmlFor="past3day">3 days</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" className="custom-control-input" id="past7day" name="period" checked={this.state.period == "7"} onChange={this.doFilterByDate} value="7" />
                                                <label className="custom-control-label" htmlFor="past7day">7 days</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" className="custom-control-input" id="past30days" name="period" checked={this.state.period == "30"} onChange={this.doFilterByDate} value="30" />
                                                <label className="custom-control-label" htmlFor="past30days">30 days</label>
                                            </div>
                                        </div>
                                        {/* <div className="custom-controls-stacked d-block common-border after-border cmFont">
                                            <h6 className="common-font-weight-bold">Job Type</h6>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" value="any" name="employment_type1" checked={this.state.employment_type.indexOf('any') != -1} onChange={this.setAdvanceSearchCheckboxValue} id="any" />
                                                <label className="custom-control-label" htmlFor="any">Any</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="intern" value="Intern" name="employment_type4" checked={this.state.employment_type.indexOf('Intern') != -1} onChange={this.setAdvanceSearchCheckboxValue} />
                                                <label className="custom-control-label" htmlFor="intern">Intern</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="partTime" value="partTime" name="employment_type2" checked={this.state.employment_type.indexOf('partTime') != -1} onChange={this.setAdvanceSearchCheckboxValue} />
                                                <label className="custom-control-label" htmlFor="partTime">Part - Time</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="fullTime" value="fullTime" name="employment_type5" checked={this.state.employment_type.indexOf('fullTime') != -1} onChange={this.setAdvanceSearchCheckboxValue} />
                                                <label className="custom-control-label" htmlFor="fullTime">Full - Time</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="Contractual" value="Contractual" name="employment_type3" checked={this.state.employment_type.indexOf('Contractual') != -1} onChange={this.setAdvanceSearchCheckboxValue} />
                                                <label className="custom-control-label" htmlFor="Contractual">Contractual</label>
                                            </div>
                                        </div> */}

                                        <div className="radio-button-filter common-border after-border cmFont">
                                            <h6 className="common-font-weight-bold">Experience</h6>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" 
                                                    value="0~1" 
                                                    onChange={ (e) => this.filterByExpericence(e) } 
                                                    className="custom-control-input"
                                                    checked={this.state.experience === '0~1'}
                                                    id="ex1" name="experience" />
                                                <label className="custom-control-label" htmlFor="ex1">Less than 1 year</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" value="1~2" 
                                                    onChange={ (e) => this.filterByExpericence(e) } 
                                                    checked={this.state.experience === '1~2'}
                                                    className="custom-control-input" 
                                                    id="ex2" 
                                                    name="experience" />
                                                <label className="custom-control-label" htmlFor="ex2">1~2 years</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input 
                                                    type="radio" 
                                                    value="3~5" 
                                                    onChange={ (e) => this.filterByExpericence(e) }
                                                    checked={this.state.experience === '3~5'}
                                                    className="custom-control-input" 
                                                    id="ex3" 
                                                    name="experience" 
                                                />
                                                <label className="custom-control-label" htmlFor="ex3">3~5 years</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input 
                                                    type="radio" 
                                                    value="6~9" 
                                                    onChange={ (e) => this.filterByExpericence(e) }
                                                    checked={this.state.experience === '16~9'}
                                                    className="custom-control-input" 
                                                    id="ex4" name="experience" 
                                                />
                                                <label className="custom-control-label" htmlFor="ex4">6~9 years</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input 
                                                    type="radio" 
                                                    value="10~50" 
                                                    onChange={ (e) => this.filterByExpericence(e) } 
                                                    checked={this.state.experience === '10~50'}
                                                    className="custom-control-input" 
                                                    id="ex5" 
                                                    name="experience" 
                                                />
                                                <label className="custom-control-label" htmlFor="ex5">Over 10 years</label>
                                            </div>
                                        </div>

                                        <div className="radio-button-filter after-border cmFont">
                                            <h6 className="common-font-weight-bold">Salary Range</h6>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" onChange={this.filterBySalary} name="salary" value="1-10000" checked={this.state.salary == "1-10000"} className="custom-control-input" id="sal1"/>
                                                <label className="custom-control-label" htmlFor="sal1">Less than 10000</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" onChange={this.filterBySalary} name="salary" value="10000-20000" checked={this.state.salary == "10000-20000"} className="custom-control-input" id="sal2"/>
                                                <label className="custom-control-label" htmlFor="sal2">10000~20000</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" onChange={this.filterBySalary} name="salary" value="20000-50000" checked={this.state.salary == "20000-50000"} className="custom-control-input" id="sal3"/>
                                                <label className="custom-control-label" htmlFor="sal3">20000~50000 </label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" onChange={this.filterBySalary} name="salary" value="50000-100000" checked={this.state.salary == "50000-100000"} className="custom-control-input" id="sal4"/>
                                                <label className="custom-control-label" htmlFor="sal4">50000~100000</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" onChange={this.filterBySalary} name="salary" value="100000-10000000" checked={this.state.salary == "100000-10000000"} className="custom-control-input" id="sal5"/>
                                                <label className="custom-control-label"  htmlFor="sal5">More than 100000</label>
                                            </div>
                                        </div>

                                        <div className="custom-controls-stacked d-block common-border after-border cmFont">
                                            <h6 className="common-font-weight-bold">Employee Type</h6>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="direct" />
                                                <label className="custom-control-label" htmlFor="direct">Direct</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="recruiter1" />
                                                <label className="custom-control-label" htmlFor="recruiter1">Recruiter</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="agency" />
                                                <label className="custom-control-label" htmlFor="agency">Agency</label>
                                            </div>
                                        </div>

                                        {/* <div className="custom-controls-stacked d-block common-border after-border cmFont">
                                            <h6 className="common-font-weight-bold">Job Level</h6>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="jlany" />
                                                <label className="custom-control-label" htmlFor="jlany">Any</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="jlentry" />
                                                <label className="custom-control-label" htmlFor="jlentry">Entry</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="jlmid" />
                                                <label className="custom-control-label" htmlFor="jlmid">Mid</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="jlagency" />
                                                <label className="custom-control-label" htmlFor="jlagency">Senior</label>
                                            </div>
                                        </div> */}

                                        {/* <div className="radio-button-filter searchInfo cmFont">
                                                <h6 className="common-font-weight-bold">Company</h6>
                                                <div class="input-group">
                                                    <Typeahead
                                                        labelKey="name"
                                                        onChange={(selected) => {
                                                            if(selected.length > 0){
                                                                this.setState({ company : selected[0].name})
                                                                setTimeout(this.advanceSearch, 500)
                                                            }
                                                        }}
                                                        options={ this.state.companies }
                                                        placeholder="Choose a company..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="radio-button-filter searchInfo cmFont">
                                                <h6 className="common-font-weight-bold">Job Category</h6>
                                                <div class="input-group">
                                                    <Typeahead
                                                        labelKey="name"
                                                        onChange={(selected) => {
                                                            if(selected.length > 0){
                                                                this.setState({ category : selected[0].name})
                                                                setTimeout(this.advanceSearch, 500)
                                                            }
                                                        }}
                                                        options={ this.state.categories }
                                                        placeholder="Choose a category..."/>
                                                </div>
                                            </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9">
                                <div className="card infOfUsers">
                                    <div className="card-header infOfUsers-cHeader">
                                        <h5>Available Jobs</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="">
                                            <div className="headline">
                                                <h2 className="title job">We found <span className="text-primary-color"> {this.state.total}</span> available job(s) for you</h2>
                                            </div>
                                            <table className="table table-striped job-details-table table-responsive">
                                                <tbody >
                                                    {joblist}
                                                    <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.total} paginate={paginate} />
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(jobs);