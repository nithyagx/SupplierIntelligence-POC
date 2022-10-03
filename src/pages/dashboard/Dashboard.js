import React, { useState, useEffect, StrictMode } from "react";
import { connect } from "react-redux";
import './Dashboard.css'
import { GridLayout, Responsive, WidthProvider } from "react-grid-layout";
import Plot from 'react-plotly.js';
import { getCognitiveData, getDrilldownData } from "../../store/actions/dashboardAction"
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

    useEffect(() => {
        props.getCognitiveData();
    }, [])
    // const layout = [
    //     { i: "a", x: 0, y: 0, w: 8, h: 20 },
    //     { i: "b", x: 1, y: 0, w: 3, h: 2},// minW: 2, maxW: 4 },
    //     { i: "c", x: 4, y: 0, w: 1, h: 2 }
    //   ];
    // const layout = Layout && Layout["md"];
    const ResponsiveGridLayout = WidthProvider(Responsive);
    let data = props.trace//[props.trace1, props.trace2]
    var graphLayout = {
        barmode: 'stack',
        autosize: true,
    }
    let config = {
        responsive: true
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
    // const renderFooter = (name) => {
    //     return (
    //         <div>
    //             <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
    //             <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
    //         </div>
    //     );
    // }
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
    // const products = [
    //     {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
    //     {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
    //     {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
    //     {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
    //     {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
    //     {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
    //     {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
    //     {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
    //     {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
    //     {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
    // ]

    // const getHighlightedText1 = (text, highlight) => {
    //     // Split on highlight term and include term into parts, ignore case
    //     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    //     let a = 0;
    //     return <span> { parts.map((part, i) => 
    //         // {if(part.toLowerCase() === highlight.toLowerCase()) {
    //             // a=1;
    //             <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { background: "#FFCC99" } : {} }>
    //                 { part }
    //             </span>
    //         // }}
    //         )
    //     } </span>;
    // }
    // const getHighlightedText = (text) => {
    //     let selectCompanyTemp = priValues2(props.getGraphClickCompany);
    //     let selectedCompany = selectCompanyTemp && selectCompanyTemp.split("|");
    //     let option1 = "alinks|ansys|ansys\ hpc|ansys\ rf|designer\ rf|designmodeler|designspace|designxplorer|exalto|fluent|geometry\ interface|hfss|human\ body\ model|icepack|maxwell|mechanical|multiphysics|optimetrics|path\ fx|pathfinder|power\ artist|q3d|raptorx|redhawk|redhawk\ sc|seahawk|sentinel|siwave|sow|spaceclaim|totem|variance\ fx|velocerf"
    //     let option2 = "assertion\ based\ verification|avm|cdc|clock\ domain\ crossing|directed\ random\ verification|fev|formal\ equivalence\ verification|formal\ property\ verification|fpv|functional\ coverage|functional\ verification|hardware\ description\ language|hdl|ip\-xact|logic\ equivalence\ checking|logic\ simulation|metric\ driven\ verification|open\ verification\ library|ovm|portable\ stimulus|pss|random\ verification|rdc|register\ transfer\ level|reset\ domain\ crossing|rtl|rtl\ coverage\ |rtl\ debug|rtl\ design\ entry|rtl\ development|rtl\ lint|rtl\ modeling|rtl\ simulation|rtl\ simulator|rtl\ simulator\ performance|rtl\ validation|rtl\ verification|silicon\ verification\ ip|simulation\ performance|simulation\ regression|static\ verification|sva|systemrdl|systemverilog|systemverilog\ assertions|test\ bench|test\ suite|testbench|universal\ verification\ methodology|uvm|verification\ environment|verilog|vhdl|vmm"
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
    const getSelectionList = () => {
        let selectCompanyTemp = priValues2(props.getGraphClickCompany);
        let selectedCompany = selectCompanyTemp && selectCompanyTemp.split("|");
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
              const endIndex = startIndex + currentText.length;
              const nextIndex = matches[i + 1]?.index;
              const untilNextText = text.slice(endIndex, nextIndex);
              return (
                <span key={i}>
                  <mark style={{ background: "#FFCC99" }}>{currentText}</mark>
                  {untilNextText}
                </span>
              );
            })}
          </span>
        );
      }

    const processedTextContent = (val) => {
        let selectCompanyTemp = priValues2(props.getGraphClickCompany);// priValues2(selectedDetail.company);
        let selectedCompany = selectCompanyTemp && selectCompanyTemp.split("|");
        let str = "";

        // if(selectedCompany && selectedCompany.length) {
        //     for(let i=0;i<selectedCompany.length;i++) {
        //         if(val && val.includes(" ")) {
        //             let value = val.split(" ");
        //             for(let j=0;j<value.length;j++) {
        //                 let count = 1;
        //                 if(value[j].includes(selectedCompany[i].toLowerCase())) {
        //                     count = 0;
        //                     if(str.length == 0) {
        //                         str += value[j]
        //                     }
        //                     else {
        //                     str += " " + "<span style={{'background': 'yellow'}}>{value[j]}</span>" + " ";
        //                     }
        //                 }
        //                 if(count) {
        //                     if(str.length == 0) {
        //                         str += value[j]
        //                     }
        //                     else {
        //                         str = str + " " + value[j] + " "
        //                     }
        //                 }
        //             }
        //         } else {
        //             if(val && val.includes(selectedCompany[i].toLowerCase())) {
        //                 str = " " + "<span style={{'background': 'yellow'}}>{val}</span>" + " ";
        //             } else {
        //                 str = " " + val + " "
        //             }
        //         }
        //     }
        // }
        return (str)
    }
    return (
        <div>
            {/* <ResponsiveGridLayout
                className="layout"
                layout={layout}
                // cols={12}
                //   rowHeight={30}
                width={1200}
                isDraggable
                isRearrangeable
                isResizable
                breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            > */}
                <div key="graphParent" id="graph1" style={{ 'border': '1px solid', 'height': "550px", 'width': '700px' }}>
                    <Plot id="graph2" data={data} layout={graphLayout} config={config} style={{ 'height': '100%', 'width': '100%' }}
                        onClick={(data) => { graphOneClick(data) }} />
                </div>
                {/* <div key="graph2" style={{ 'border': '1px solid' }}>b</div>
                <div key="graph3" style={{ 'border': '1px solid' }}>c</div> */}
            {/* </ResponsiveGridLayout> */}
            <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                {/* <p>Hello {label1} and {value1}</p> */}
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
                {/* <p>jobkey : {processedTextContent(selectedDetail.jobKey)}</p>
                <p>jobtitle : {processedTextContent(selectedDetail.jobtitle)}</p>
                <p>company : {processedTextContent(selectedDetail.company)}</p>
                <p>city : {processedTextContent(selectedDetail.city)}</p>
                <p>state: {processedTextContent(selectedDetail.state)}</p>
                <p>date_posted: {processedTextContent(selectedDetail.date_posted)}</p>
                <p>create_date: {processedTextContent(selectedDetail.create_date)}</p>
                <p>text_content: {processedTextContent(selectedDetail.text_content)}</p> */}
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
        getGraphClickCompany: state.dashboard.getGraphClickCompany
        // trace1: state.dashboard.trace1,
        // trace2: state.dashboard.trace2
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCognitiveData: () => { dispatch(getCognitiveData()) },
        getDrilldownData: (selectCompany) => { dispatch(getDrilldownData(selectCompany)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)