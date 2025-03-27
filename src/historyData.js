// SF Government History Data
// Centralized data source for Political History and Land Use Timeline components

// Political History Data (Constitutional Structure)
const politicalHistoryData = [
  {
    year: 1849,
    event: "California Constitution adopted",
    notes: "Coincided with the Gold Rush. Immediately followed the Treaty of Guadalupe Hidalgo in 1848, which granted California territory to U.S."
  },
  {
    year: 1850,
    event: "California State Legislature established",
    notes: "San Francisco County and San Francisco City established as separate entities."
  },
  {
    year: 1856,
    event: "San Francisco County and City consolidated",
    notes: "Followed a period of chaos and corruption. Consolidation Act meant to streamline coordination between city and county government. It also created San Mateo County, which was speculated to be a haven for criminals."
  },
  {
    year: 1879,
    event: "Second California Constitution adopted (revision)",
    notes: "Major rewrite of entire Constitution. This document is now our active Constitution, though amendments have been added. Article 11 opens the door for local governments to take on home power."
  },
  {
    year: 1898,
    event: "First San Francisco Charter adopted",
    notes: "Until this point, San Francisco had been governed by state statute. This followed a Gilded Age period of big business and limited government capacity. The forthcoming Progressive Era would see governments take on a bigger role in stamping out corruption, and a greater influence of party bosses."
  },
  {
    year: 1932,
    event: "Second San Francisco Charter adopted (revision)",
    notes: "Introduces Chief Administrative Officer to split out responsibilities of executive, in part to reduce corruption."
  },
  {
    year: 1996,
    event: "Third San Francisco Charter adopted (revision)",
    notes: "In response to inefficiencies resulting from split executive model, introduced \"strong mayor\" model. Strength of mayor has diminished over time, with authority shifting to BoS via amendments. Revision first put on ballot in 1980."
  }
];

// Land Use History Data
const landUseHistoryData = [
  {
    year: 1917,
    event: "San Francisco Planning Commission created",
    notes: "Advisory body only."
  },
  {
    year: 1921,
    event: "San Francisco Zoning Ordinance adopted",
    notes: "First full plan for San Francisco as opposed to ad hoc designations, but primitive relative to today's planning code."
  },
  {
    year: 1942,
    event: "San Francisco Planning Department created",
    notes: "Culmination of Progressive Era of big government. Provided human capital for implementing land use plan."
  },
  {
    year: 1945,
    event: "First General Plan adopted",
    notes: "Established comprehensive planning framework for city development."
  },
  {
    year: 1960,
    event: "Second San Francisco Zoning Ordinance codified",
    notes: "Born out of the activism in response to urban renewal to block construction of new highways. Represented a reining in of government power and a rise of community input."
  },
  {
    year: 1970,
    event: "California Environmental Quality Act enacted",
    notes: "Established environmental review requirements for development projects."
  }
];

// Export the data sets for use in different components
export { politicalHistoryData, landUseHistoryData };