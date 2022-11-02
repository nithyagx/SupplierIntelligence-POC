import React, { useState, useEffect, StrictMode } from "react";
import { connect } from "react-redux";
import './Dashboard.css'
import { GridLayout, Responsive, WidthProvider } from "react-grid-layout";
import Plot from 'react-plotly.js';
import { getCognitiveData, getDrilldownData, setConfigLayoutChange } from "../../store/actions/dashboardAction"
import Layout from "../../constants/companyConfig";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
// import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import Datatable from '../../components/Datatable';
import {priValues2} from '../../constants/companyConfig';

function Dashboard(props) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [label1, setLabel1] = useState("");
    const [value1, setValue1] = useState();
    const [selectCompany, setSelectCompany] = useState("")
    const [drilldown, setDrillDown] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayDialogDetail, setDisplayDialogDetail] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState([]);
    const [layoutConfig, setLayoutConfig] = useState([{ x: 3, y: 0, w: 5, h:3 }]);

    useEffect(() => {
        props.getCognitiveData();
    }, [])
    const ResponsiveGridLayout = WidthProvider(Responsive);
    let data = props.trace//[props.trace1, props.trace2]
    var graphLayout = {
        barmode: 'stack',
        autosize: true,
        // useResizeHandler: true,
        // width: 500,
        // height: 500,
        yaxis: {
            automargin: true
        },
        xaxis: {
            automargin: true
        }
        // margin: {
        //     // l: 0,
        //     // r: 10,
        //     b: 20,
        //     // t: 20,
        //     pad: 5
        // }
    }
    let config = {
        responsive: true,
        // dragmode: 'pan'
    }
    const clickedColumn = (value) => {
        console.log("value - - ",value);
        setSelectedDetail(value);
        setDisplayDialogDetail(true);
    }
    // console.log("Layout ", Layout)
    const graphOneClick = (data) => {
        console.log("data", data)
        setDisplayBasic(true);
        setLabel1(data['points'][0]['label'])
        setValue1(data['points'][0]['value'])
        setSelectCompany(data['points'][0]['x'])
        let data1 = {"data": {"ndarray":{
          "criteria1":[data['points'][0]['data']['name']],
          
          "criteria2":["assertion based verification", "avm", "cdc", "clock domain crossing", "directed random verification", "fev", "formal equivalence verification", "formal property verification", "fpv", "functional coverage", "functional verification", "hardware description language", "hdl", "ip-xact", "logic equivalence checking", "logic simulation", "metric driven verification", "open verification library", "ovm", "portable stimulus", "pss", "random verification", "rdc", "register transfer level", "reset domain crossing", "rtl", "rtl coverage ", "rtl debug", "rtl design entry", "rtl development", "rtl lint", "rtl modeling", "rtl simulation", "rtl simulator", "rtl simulator performance", "rtl validation", "rtl verification", "silicon verification ip", "simulation performance", "simulation regression", "static verification", "sva", "systemrdl", "systemverilog", "systemverilog assertions", "test bench", "test suite", "testbench", "universal verification methodology", "uvm", "verification environment", "verilog", "vhdl", "vmm"],
          
          "grouping":[data['points'][0]['label']],
          
          "start_time":'2021-09-13', 
          
          "end_time":'2022-09-13',
  
          "datasrc":["news", "jobs", "twitter"]
          }}}
        console.log("data1 ",data1)
        props.getDrilldownData(data['points'][0]['x']);
    }
    const onHide = (name) => {
        setDisplayBasic(false);
    }
    const onHideDetail = (name) => {
        setDisplayDialogDetail(false);
    }
    const jobColumns = [
        {field: 'company', header: 'Company'},
        {field: 'date', header: 'Date'},
        {field: 'jobtitle', header: 'Job Title'},
        {field: 'city', header: 'City'},
        {field: 'state', header: 'State'}
    ];
    const newsColumns = [
        {field: 'code', header: 'Supplier'},
        {field: 'name', header: 'Date'},
        {field: 'category', header: 'Title'},
        {field: 'quantity', header: 'Summary'},
        {field: 'image', header: 'Compound'},
        {field: 'price', header: 'ArticleID'}
    ];
    const tweetsColumns = [
        {field: 'code', header: 'Supplier'},
        {field: 'name', header: 'TwitterUser'},
        {field: 'category', header: 'Date'},
        {field: 'quantity', header: 'Tweet'},
        {field: 'image', header: 'Compound'},
        {field: 'price', header: 'TweetID'}
    ];
    const dynamicJobColumns = jobColumns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });
    const dynamicNewsColumns = newsColumns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });
    const dynamicTweetsColumns = tweetsColumns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    // const getHighlightedText = (text) => {
    //     let selectCompanyTemp = priValues2(props.getGraphClickCompany);
    //     let selectedCompany = selectCompanyTemp && selectCompanyTemp.split("|");
    //     let option1 = "alinks|ansys|ansys hpc|ansys rf|designer rf|designmodeler|designspace|designxplorer|exalto|fluent|geometry interface|hfss|human body model|icepack|maxwell|mechanical|multiphysics|optimetrics|path fx|pathfinder|power artist|q3d|raptorx|redhawk|redhawk sc|seahawk|sentinel|siwave|sow|spaceclaim|totem|variance fx|velocerf"
    //     let option2 = "assertion based verification|avm|cdc|clock domain crossing|directed random verification|fev|formal equivalence verification|formal property verification|fpv|functional coverage|functional verification|hardware description language|hdl|ip-xact|logic equivalence checking|logic simulation|metric driven verification|open verification library|ovm|portable stimulus|pss|random verification|rdc|register transfer level|reset domain crossing|rtl|rtl coverage |rtl debug|rtl design entry|rtl development|rtl lint|rtl modeling|rtl simulation|rtl simulator|rtl simulator performance|rtl validation|rtl verification|silicon verification ip|simulation performance|simulation regression|static verification|sva|systemrdl|systemverilog|systemverilog assertions|test bench|test suite|testbench|universal verification methodology|uvm|verification environment|verilog|vhdl|vmm"
    //     let count = 1;
    //     if(text && text.length) {
    //         // let resp = getHighlightedText1(text,selectedCompany[2]);
    //         // return resp;
    //         let resp = selectedCompany.map((highlight, k) => {
    //             if(k==0) {
    //                 count = 1;
    //             }
    //             const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    //             let companyDetails = parts.map(v => v.toLowerCase());
    //             if(companyDetails.indexOf(highlight) === -1) {
    //                 count = 0;
    //             } else {
    //                 count = 2;
    //                 return <span> {
    //                     parts.map((part, i) =>
    //                         <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { background: "#FFCC99" } : {} }>
    //                             { part }
    //                         </span>
    //                     )
    //                 } </span>;
    //             }
    //             // }
    //         })
    //         if(count == 0) {
    //             resp =  <span>
    //                         { text }
    //                     </span>
    //         }
    //         return resp;
    //     }
    // }

    // const getHighlightedText = (text) => {
    //     // Split on highlight term and include term into parts, ignore case
    //     let inputCompany = priValues2(props.getGraphClickCompany);
    //     let inputText = inputCompany && inputCompany.split("|");
    //     inputText.map((highlight) => {
    //         const parts = text && text.split(new RegExp(`(${highlight})`, 'gi'));
    //         return <span> { parts && parts.map((part, i) => 
    //             <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { background: "#FFCC99" } : {} }>
    //                 { part }
    //             </span>)
    //         } </span>;
    //     })
    // }
    let options1 = "alinks|ansys|ansys hpc|ansys rf|designer rf|designmodeler|designspace|designxplorer|exalto|fluent|geometry interface|hfss|human body model|icepack|maxwell|mechanical|multiphysics|optimetrics|path fx|pathfinder|power artist|q3d|raptorx|redhawk|redhawk sc|seahawk|sentinel|siwave|sow|spaceclaim|totem|variance fx|velocerf"
    let options2 = "assertion based verification|avm|cdc|clock domain crossing|directed random verification|fev|formal equivalence verification|formal property verification|fpv|functional coverage|functional verification|hardware description language|hdl|ip-xact|logic equivalence checking|logic simulation|metric driven verification|open verification library|ovm|portable stimulus|pss|random verification|rdc|register transfer level|reset domain crossing|rtl|rtl coverage |rtl debug|rtl design entry|rtl development|rtl lint|rtl modeling|rtl simulation|rtl simulator|rtl simulator performance|rtl validation|rtl verification|silicon verification ip|simulation performance|simulation regression|static verification|sva|systemrdl|systemverilog|systemverilog assertions|test bench|test suite|testbench|universal verification methodology|uvm|verification environment|verilog|vhdl|vmm"
    const getSelectionList = () => {
        let selectedCompany = [];
        let selectCompanyTemp = priValues2(props.getGraphClickCompany);
        if(selectCompanyTemp && selectCompanyTemp.length) {
            selectedCompany = selectCompanyTemp.split("|");
        }
        let option1 = "alinks|ansys|ansys hpc|ansys rf|designer rf|designmodeler|designspace|designxplorer|exalto|fluent|geometry interface|hfss|human body model|icepack|maxwell|mechanical|multiphysics|optimetrics|path fx|pathfinder|power artist|q3d|raptorx|redhawk|redhawk sc|seahawk|sentinel|siwave|sow|spaceclaim|totem|variance fx|velocerf"
        let option2 = "assertion based verification|avm|cdc|clock domain crossing|directed random verification|fev|formal equivalence verification|formal property verification|fpv|functional coverage|functional verification|hardware description language|hdl|ip-xact|logic equivalence checking|logic simulation|metric driven verification|open verification library|ovm|portable stimulus|pss|random verification|rdc|register transfer level|reset domain crossing|rtl|rtl coverage |rtl debug|rtl design entry|rtl development|rtl lint|rtl modeling|rtl simulation|rtl simulator|rtl simulator performance|rtl validation|rtl verification|silicon verification ip|simulation performance|simulation regression|static verification|sva|systemrdl|systemverilog|systemverilog assertions|test bench|test suite|testbench|universal verification methodology|uvm|verification environment|verilog|vhdl|vmm"
        
        let opt1 = option1 && option1.split("|");
        let opt2 = option2 && option2.split("|");
        opt1.map((val) => {
                return selectedCompany.push(val);
        })
        opt2.map((val) => {
                return selectedCompany.push(val)
        })
        return selectedCompany
    }
    function Highlight({ children: text = "", tags = [] }) {
        if (!tags?.length) return text;
        const matches = [...text.matchAll(new RegExp(tags.join("|"), "ig"))];
        const startText = text.slice(0, matches[0]?.index);
        return (
          <span>
            {startText}
            {matches.map((match, i) => {
              const startIndex = match.index;
              const currentText = match[0];
              console.log("current text",currentText)
              const endIndex = startIndex + currentText.length;
              const nextIndex = matches[i + 1]?.index;
              const untilNextText = text.slice(endIndex, nextIndex);
              return (
                <span key={i}>
                  <mark style={options1.includes(currentText.toLowerCase()) ? { background: "#f7f28f" } : options2.includes(currentText.toLowerCase()) ? {"background":"#a0edf2"} : { background: "#FFCC99" }}>{currentText}</mark>
                  {untilNextText}
                </span>
              );
            })}
          </span>
        );
      }
    const onGridLayoutResizeStop = (e) => {
        // alert("hi")
        // Plot.relayout('graph1');
        console.log("e = ",e)
        setLayoutConfig(e);
        props.setConfigLayoutChange(e)
        // document.querySelector('[data-title="Autoscale"]').click();
        // Plot.relayout('graphParent', {
        //     'xaxis.autorange': true,
        //     'yaxis.autorange': true
        // });
    }
    const onGridLayoutChange = e => {
        // console.log("e = ",e)
        // setLayoutConfig(e);
        // props.setConfigLayoutChange(e)
    }
    const onDragStop = e => {
        props.setConfigLayoutChange(e)
    }
    return (
        <div>
            <ResponsiveGridLayout
                className="layout"
                layout={props && props.setChangedLayout}
                // cols={12}
                //   rowHeight={30}
                width={1200}
                isDraggable
                isRearrangeable
                isResizable
                autoSize
                draggableHandle=".grid-item__title"
                // breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                onResizeStop={(e) => onGridLayoutResizeStop(e)}
                // onLayoutChange={e => onGridLayoutChange(e)}
                onDragStop={(e) => onDragStop(e)}
                useCSSTransforms
            >
                <div data-grid={props && props.setChangedLayout && props.setChangedLayout[0]} key="graphParent">
                    <div className="grid-item__title" style={{'minWidth': '100%', 'color': '#000', 'fontWeight': 'bold'}}>Graph 1</div>
                    <Plot id="graph1" className="grid-item__graph" data={data} layout={graphLayout} config={config} style={{ 'height': '100%', 'width': '100%' }}
                        onClick={(data) => { graphOneClick(data) }} />
                </div>
                <div data-grid={props && props.setChangedLayout && props.setChangedLayout[1]} key="graph2">
                    <div className="grid-item__title" style={{'minWidth': '100%', 'color': '#000', 'fontWeight': 'bold'}}>Graph 2</div>
                    <Plot id="graph" className="grid-item__graph" data={data} layout={graphLayout} config={config} style={{ 'height': '100%', 'width': '100%' }}
                        onClick={(data) => { graphOneClick(data) }} />
                </div>
                <div data-grid={props && props.setChangedLayout && props.setChangedLayout[2]} key="graph3">
                    <div className="grid-item__title" style={{'minWidth': '100%', 'color': '#000', 'fontWeight': 'bold'}}>Graph 3</div>
                    <Plot id="graph" className="grid-item__graph" data={data} layout={graphLayout} config={config} style={{ 'height': '100%', 'width': '100%' }}
                        onClick={(data) => { graphOneClick(data) }} />
                </div>
            </ResponsiveGridLayout>
            <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                <p style={{'color': 'blue'}}>Input "all" under Company filter to view all companies</p>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Jobs">
                        <Datatable data={props.modalJobData} columnList={dynamicJobColumns} clickedColumn={clickedColumn} />
                    </TabPanel>
                    <TabPanel header="News">
                        <Datatable data={props.modalNewsData} columnList={dynamicNewsColumns} />
                    </TabPanel>
                    <TabPanel header="Tweets">
                        <Datatable data={props.modalTweetsData} columnList={dynamicTweetsColumns} />
                        {/* <DataTable value={products}>
                            {dynamicColumns}
                        </DataTable> */}
                    </TabPanel>
                </TabView>
            </Dialog>
            <Dialog header="Selected Data" visible={displayDialogDetail} style={{ width: '50vw' }} onHide={() => onHideDetail('displayDialogDetail')}>
                <p>jobkey : 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.jobKey}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.jobKey)} */}
                </p>
                <p>jobtitle : 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.jobtitle}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.jobtitle)} */}
                </p>
                <p>company : 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.company}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.company)} */}
                </p>
                <p>city : 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.city}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.city)} */}
                </p>
                <p>state: 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.state}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.state)} */}
                </p>
                <p>date_posted: 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.date_posted}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.date_posted)} */}
                </p>
                <p>create_date: 
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.create_date}
                    </Highlight>
                    {/* {getHighlightedText(selectedDetail.create_date)} */}
                </p>
                <p>text_content:
                    <Highlight tags={getSelectionList()}>
                        {selectedDetail.text_content}
                    </Highlight>
                </p>
                {/* <p>text_content: {getHighlightedText(selectedDetail.text_content)}</p> */}
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        trace: state.dashboard.trace,
        modalJobData: state.dashboard.modalJobData,
        modalNewsData: state.dashboard.modalNewsData,
        modalTweetsData: state.dashboard.modalTweetsData,
        getGraphClickCompany: state.dashboard.getGraphClickCompany,
        setChangedLayout: state.dashboard.setChangedLayout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCognitiveData: () => { dispatch(getCognitiveData()) },
        getDrilldownData: (selectCompany) => { dispatch(getDrilldownData(selectCompany)) },
        setConfigLayoutChange: (layoutConfig) => { dispatch(setConfigLayoutChange(layoutConfig))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)