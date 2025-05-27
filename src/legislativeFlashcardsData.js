// Legislative Process Flashcards Data
// Centralized data source for Legislative Process Flashcards component

const legislativeFlashcardsData = [
  {
    Prompt: "In the normal legislative process, who may cause legislation to be written?",
    Response: "Mayor, Departments, Commissions, Supervisors"
  },
  {
    Prompt: "What are the three types of Board actions?",
    Response: "- Ordinances: Binding legislation\n- Resolutions: Non-binding statements, typically of approval or disapproval\n- Motions: Calls for action pertaining to Board of Supervisors procedure"
  },
  {
    Prompt: "If the Mayor returns a passed ordinance unsigned, what happens?",
    Response: "It's enacted 10 days later."
  },
  {
    Prompt: "If the Mayor vetoes a passed ordinance, can the Board of Supervisors respond?",
    Response: "Yes, a veto can be overturned by 8 members of the Board."
  },
  {
    Prompt: "How long after an ordinance is enacted (when it's signed by the Mayor OR 10 days after the Mayor leaves it unsigned) is an ordinance effective?",
    Response: "30 days"
  },
  {
    Prompt: "Can commissions create laws?",
    Response: "Commissions can create administrative law (resolutions) within the constraints of relevant statutory law."
  },
  {
    Prompt: "Can federal courts remove state/local laws from the books?",
    Response: "No, but they can block them."
  },
  {
    Prompt: "What are the names of the appeals courts at the federal and state level?",
    Response: "- U.S.: Circuit Appellate Courts\n- California: California Court of Appeals"
  },
  {
    Prompt: "What is the name of the state trial court with jurisdiction over San Francisco?",
    Response: "San Francisco County Superior Court"
  },
  {
    Prompt: "What is the name of the state appeals court with jurisdiction over San Francisco?",
    Response: "California Court of Appeal for the First District (First District Court of Appeals)"
  },
  {
    Prompt: "What is the name of the federal trial court with jurisdiction over San Francisco?",
    Response: "United States District Court for the Northern District of California"
  },
  {
    Prompt: "What is the name of the federal appeals court with jurisdiction over San Francisco?",
    Response: "United States Court of Appeals for the Ninth Circuit (Ninth Circuit Court of Appeals)"
  },
  {
    Prompt: "What are the five types of ballot measures in California?",
    Response: "- Changes to the charter\n- Legislation (ordinances and resolutions)\n- Revenue measures\n- Recalls of select officials\n- Legislative referenda"
  },
  {
    Prompt: "In our software analogy, what kind of change to a charter represents a change from version 3.0 to 4.0?",
    Response: "Revision"
  },
  {
    Prompt: "In our software analogy, what kind of change to a charter represents a change from version 3.0 to 3.1?",
    Response: "Amendment"
  },
  {
    Prompt: "What are the two kinds of revenue measures you might see on the California ballot?",
    Response: "- Bonds\n- Taxes"
  },
  {
    Prompt: "What are the basic mechanics of a referendum?",
    Response: "A legislative referendum is an attempt to block an enacted piece of legislation. Signatures are gathered in the 30 days before enacted legislation becomes effective, at which point a special election is triggered."
  },
  {
    Prompt: "What are the two mechanisms for introducing a a ballot measure?",
    Response: "- Referral by government actor\n- Initiative via public signatures"
  },
 {
    Prompt: "Can the Mayor send an ordinance to the ballot?",
    Response: "- Yes, independently"
  },
{
    Prompt: "Can the Board of Supervisors amend the Charter?",
    Response: "- No, ballot amendments must appear on the ballot"
  },
  {
    Prompt: "What is required to send a proposed amendment to the Charter onto the ballot? Hint: There are two possible pathways.",
    Response: "-8/11 Board of Supervisors members (supermajority)\n- 10% of registered voters (~50K people)"
  },
  {
    Prompt: "What is required to send proposed legislation onto the ballot? Hint: There are three possible pathways.",
    Response: "-Mayoral referral\n- 6/11 Board of Supervisors members (simple majority)\n- 2% of registered voters (~10K voters)"
  },
  {
    Prompt: "What is required to send a recall onto the ballot?",
    Response: "Recalls can be placed on the ballot by initiative only.\n- For citywide officials: 10% of registered voters\n- For district officials: 15% - 20% of registered voters in that district"
  },
  {
    Prompt: "Which kinds of governmental actions must happen via ballot measure in San Francisco?",
    Response: "- Changes to the Charter\n- Revenue measures"
  },
  {
    Prompt: "Name some of the reasons why a Supervisor may send a piece of legislation to the ballot.",
    Response: "- It's mandatory (Charter amendments)\n- Voter legitimacy and/or 'locking in' an ordinance, as ballot measures can only be undone by future ballot measures \n- Avoiding a mayoral veto (assuming sufficient public support) \n- Triggering a public conversation"
  }
];

export default legislativeFlashcardsData;