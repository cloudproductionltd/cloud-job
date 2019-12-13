import React, { Component } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';

export default class Container extends Component {
  constructor(props){
    super(props)
    const data = [
      {
        label: "VP Accounting",
        checked: true,
        children: [
          {
            label: "iWay",
            children: [
              { label: "Universidad de Especialidades del Espíritu Santo" },
              { label: "Marmara University" },
              { label: "Baghdad College of Pharmacy" }
            ]
          },
          {
            label: "KDB",
            children: [
              { label: "Latvian University of Agriculture" },
              { label: "Dublin Institute of Technology" }
            ]
          },
          {
            label: "Justice",
            children: [
              { label: "Baylor University" },
              { label: "Massachusetts College of Art" },
              { label: "Universidad Técnica Latinoamericana" },
              { label: "Saint Louis College" },
              { label: "Scott Christian University" }
            ]
          },
          {
            label: "Utilization Review",
            children: [
              { label: "University of Minnesota - Twin Cities Campus" },
              { label: "Moldova State Agricultural University" },
              { label: "Andrews University" },
              { label: "Usmanu Danfodiyo University Sokoto" }
            ]
          },
          {
            label: "Norton Utilities",
            children: [
              { label: "Universidad Autónoma del Caribe" },
              { label: "National University of Uzbekistan" },
              { label: "Ladoke Akintola University of Technology" },
              { label: "Kohat University of Science and Technology  (KUST)" },
              { label: "Hvanneyri Agricultural University" }
            ]
          }
        ]
      }
    ];
    this.state = { data: data }
  }


  uncheckAll = () => {
    const data = this.state.data
    data[0].checked = false
    this.setState({data})
  }

  checkAll = () => {
    const data = this.state.data
    data[0].checked = true
    this.setState({ data })
  }

  render() {
    return (
    <div>
      <DropdownTreeSelect data={this.state.data} />
      <button onClick={this.checkAll}>Check all</button>
      <button onClick={this.uncheckAll}>Uncheck all</button>
    </div>
    )
  }
}
