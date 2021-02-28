import React, { Component } from 'react'
import Image from 'next/image'

export default function MV(props) {
  const acf = props.acf;
  let imageHtml = null
  let imageSpHtml = null
  // let regionHtml = <Regions />

  /** KIỂM TRA ACF TỒN TẠI */
  if (!!acf) {

    /** DATA IMAGE BACKGROUND */
    const image = acf['mv_images']
    const imageSp = acf['mv_images_sp']

    if (!!image && !!image[0]) {
      const imageFirst = image[0]
      // imageHtml = <img className="pc" src={'/images/mv/img-mv.jpg'} alt={imageFirst['title']} />
      imageHtml = <img className="pc" src={imageFirst['url']} alt={imageFirst['title']} />

      if (!!imageSp && !!imageSp) {
        const imageSpFirst = imageSp[0]
        imageSpHtml = <img className="sp" src={imageSpFirst['url']} alt={imageSpFirst['title']} />
      }
      else {
        imageSpHtml = <img className="sp" src={imageFirst['url']} alt={imageFirst['title']} />
      }
    }

  }

  return (
    <seciton className="home-mv --style1 anchor-first">
      <div className="__image">
        { !!imageHtml &&  imageHtml }
        { !!imageSpHtml && imageSpHtml }
      </div>

      <div className="__search">
        <div className="container --max-920">
          <form action="/for-rent/" method="GET">
            <div className="__deco sp">

            </div>

            <div className="__form pc">
              <div className="form__inner">
                <div className="__left">
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --input --size-lg">
                        <input type="text" name="search" value="" placeholder="Search by ID, keyword..." onChange="" />
                      </div>
                    </div>
                  </div>
                  
                  { /** INPUT SLIDER RANGER */ }
                  <div className="form__group --ranger">
                    <div className="form__row">
                      <div className="form__title"><label for="price">Price Range</label></div>
                      <div className="form__field">
                        <input type="text" className="range-slider" name="price" value=""
                          data-type="double"
                          data-grid="true"
                          data-min="0"
                          data-max="10000"
                          data-from="<?= $price_from ?>"
                          data-to="<?= $price_to ?>"
                          data-step="100"
                          data-prefix="$"
                          onChange=""
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --select">
                        { /** COMPONENT PROPERTY REGION SELECT */}
                        <PropertyRegions />
                      </div>
                      <div className="form__field --select">
                        { /** COMPONENT PROPERTY TYPE */}
                        <PropertyType />
                      </div>
                    </div>
                  </div>

                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --select">
                        { /** COMPONENT PROPERTY SIZE */}
                        <PropertySize />
                      </div>
                      <div className="form__field --select">
                        { /** COMPONENT PROPERTY ROOM */}
                        <PropertyRoom />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="__right">
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --btn">
                        <div className="btn btn--lg">
                          <button type="submit">
                            <span className="btn__text"><i className="icon-search"></i>SEARCH</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form__group">
                    <div className="form__row">
                      <div className="form__field --btn">
                        <div className="btn btn--transparent">
                          <a href="/for-rent/">
                            <span className="btn__text"><i className="icon-reset"></i>RESET</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </seciton>
  )
}


/**
 * CLASS REGION COMPONENT
 */
class PropertyRegions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      options: [
        { value: '', label: '-- Region --' },
        { value: '1', label: 'District 1' },
        { value: '2', label: 'District 2' },
        { value: '3', label: 'District 3' },
        { value: '4', label: 'District 4' },
        { value: '5', label: 'District 5' },
        { value: '6', label: 'District 6' },
        { value: '7', label: 'District 7' },
        { value: '8', label: 'District 8' },
        { value: '9', label: 'District 9' },
        { value: '10', label: 'District 10' },
        { value: '11', label: 'District 11' },
        { value: '12', label: 'District 12' },
        { value: 'binh-tan', label: 'Binh Tan District' },
        { value: 'binh-thanh', label: 'Binh Tan District' },
        { value: 'go-vap', label: 'Go Vap District' },
        { value: 'phu-nhuan', label: 'Phu Nhuan District' },
        { value: 'tan-phu', label: 'Tan Phu District' },
        { value: 'tan-binh', label: 'Tan Binh District' },
        { value: 'thu-duc', label: 'Thu Duc District' },
        { value: 'binh-chanh', label: 'Binh Chanh District' },
        { value: 'can-gio', label: 'Can Gio District' },
        { value: 'cu-chi', label: 'Cu Chi District' },
        { value: 'hoc-mon', label: 'Hoc Mon District' },
        { value: 'nha-be', label: 'Nha Be District' },
        { value: 'other', label: '-- Other --' },
      ]
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { options } = this.state
    let optionsList = options.map((item, i) => {
      return (
        <option key={i} value={item.value}>{ item.label }</option>
      )
    }, this)
    
    return (
      <select id="region" name="region" value={this.state.value} onChange={ this.handleChange }>
        { optionsList }
      </select>
    )
  }
}


/**
 * COMPONENT PROPERTY TYPE
 */
class PropertyType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      options: [
        { value: '', label: '-- Property Type --' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'service-apartment', label: 'Service Apartment' },
        { value: 'house', label: 'House / Shophouse' },
        { value: 'villa', label: 'Villa' },
        { value: 'office', label: 'Office' },
      ]
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { options } = this.state
    let optionsList = options.map((item, i) => {
      return (
        <option key={i} value={item.value}>{ item.label }</option>
      )
    }, this)
    
    return (
      <select id="type" name="type" value={this.state.value} onChange={ this.handleChange }>
        { optionsList }
      </select>
    )
  }
}



/**
 * COMPONENT PROPERTY SIZE
 */
class PropertySize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      options: [
        { value: '', label: '-- Size --' },
        { value: '0-50', label: '≦ 50 m²' },
        { value: '51-100', label: '51 m² ⟷ 100 m²' },
        { value: '101-150', label: '101 m² ⟷ 150 m²' },
        { value: '151-200', label: '151 m² ⟷ 200 m²' },
        { value: '201-250', label: '201 m² ⟷ 250 m²' },
        { value: '251-350', label: '251 m² ⟷ 350 m²' },
        { value: '351-500', label: '351 m² ⟷ 500 m²' },
        { value: '501-10000', label: '≧ 501 m²' },
      ]
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { options } = this.state
    let optionsList = options.map((item, i) => {
      return (
        <option key={i} value={item.value}>{ item.label }</option>
      )
    }, this)
    
    return (
      <select id="size" name="size" value={this.state.value} onChange={ this.handleChange }>
        { optionsList }
      </select>
    )
  }
}


/**
 * COMPONENT PROPERTY ROOM
 */
class PropertyRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      options: [
        { value: '', label: '-- All Room --' },
        { value: 'studio', label: 'Studio' },
        { value: '1', label: '1 Rooms' },
        { value: '2', label: '2 Rooms' },
        { value: '3', label: '3 Rooms' },
        { value: '4', label: '4 Rooms' },
        { value: '5', label: '5 Rooms' },
        { value: '6', label: '6 Rooms' },
        { value: '7', label: '7 Rooms' },
        { value: '7-more', label: '≧ 8 Rooms' },
      ]
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { options } = this.state
    let optionsList = options.map((item, i) => {
      return (
        <option key={i} value={item.value}>{ item.label }</option>
      )
    }, this)
    
    return (
      <select id="room" name="room" value={this.state.value} onChange={ this.handleChange }>
        { optionsList }
      </select>
    )
  }
}