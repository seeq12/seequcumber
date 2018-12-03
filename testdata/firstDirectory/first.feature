@manual
Feature: Capsule Time
  As a user,
  I want to visually compare capsules of signal data
  So that I can spot important differences.

  In some of the tests, the "slope" of the trace is referred to. The slope is
  determined by subtracting the end point Y-value from the start point Y-value.
  If one trace has a negative slope and one has a positive slope, they
  are opposites.

  Background:
    Given that Seeq is running in the browser
    And I have Profile Search results loaded

  Scenario: Basic Capsule Time
    When I click "Capsule" in the toolbar to switch to Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the "Capsule" element is selected
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And all capsules are listed in the Capsules Pane, right of the Details Pane
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And all capsules for all series are visible on the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And all capsules are shown in a lane as determined by their signal in the Trend Viewer
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And the Profile Search pattern is identified in the legend with a special icon
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And the Worksheet thumbnail updates in a reasonable length of time (~20 seconds)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |

  Scenario: Capsule Time Alignments
    Given I have a bunch of capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I select the "Start" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the "Start" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane originates from the same starting point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I deselect the "Start" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the visualization returns to an unaligned state
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I select the "End" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the "End" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane converges on the same end point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I select the "Maximum" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then "End" and "Maximum" are the only selected alignment options
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane converges on the same end point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane hits the same ceiling at its maximum point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I select the "Minimum" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then "Maximum" and "Minimum" are the only selected alignment options ("End" should auto-deselect)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane hits the same ceiling at its maximum point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane hits the same floor at its minimum point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I deselect the "Minimum" and "Maximum" alignment options
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And I select the "Average" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the "Average" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane is centered vertically around its individual average (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I deselect the "Average" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And I select the "Middle" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the "Middle" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And the horizontal mid-point of each trace in a given lane converges on a single point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |


  Scenario: Capsule Time hidden Alignments
    Given I have a bunch of capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And some of the trends have the opposite slope
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I select the "Start" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the "Start" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And each trace in a given lane originates from the same starting point (visually)
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I select the "End" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the trends with the opposite slope are hidden from the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I deselect the "End" alignment option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the trends with the opposite slope are redisplayed on the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |

  Scenario: Capsule Time Dimmed - outside conditions
    Given I have a bunch of capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I scroll the mouse wheel out on the horizontal axis
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the time range for the trend gets larger
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And no trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I click the 'Dimming' menu in the toolbar
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And I check the box 'Show data outside conditions'
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then dimmed trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I uncheck the 'Show data outside conditions' box
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then dimmed trend data is hidden outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806130941 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |

  Scenario: Capsule Time Dimmed - unselected signals
    Given I have all the capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I select several capsules in the Capsules Panel
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the unselected signals become dimmed in the chart
      | FAIL | 0.40.00-v201811141002 | Marius Oancea | CRAB-13940 |
    When I click the 'Dimming' menu in the toolbar
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And I check the box 'Show only selected signals'
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then only the selected capsules are displayed in the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I select a new capsule in the Capsules Panel
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then I see it appear in the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I deselect a capsule in the Capsules Panel
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then I see it disappear in the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I increase the display range
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then I still only see the signals that I have selected.
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I uncheck the box 'Show only selected signals'
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the unselected signals reappear dimmed on the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |

  Scenario: Capsule Time Dimming Menu and Alerts
    Given I have all teh capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I click on the "Dimming" menu
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And I click one or both of the checkboxes
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And then click outside of the menu
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the "Dimming" menu becomes depressed
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I unselect both of the checkboxes
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the "Dimming" menu becomes undepressed
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I click "Show only selected signals"
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And I have no capsules selected in the capsules panel
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then I see the Capsule View warning message
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I click the link part of the message
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then all the capsules are loaded in the chart
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And the "Show only selected signals" checkbox is no longer selected
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |

  Scenario: Capsule Time displays uncertain signal
    Given I have a bunch of capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And at least one of them includes an uncertain region of a signal
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then certain regions of the signal are displayed with a solid line regardless of the certainty of the containing capsule
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And uncertain regions of the signal are displayed with a dotted line regardless of the certainty of the containing capsule
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I scroll the mouse wheel out on the horizontal axis
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the time range for the trend gets larger
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
    And no trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I click the 'Dimming' option 'Show data outside conditions'
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then dimmed trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And the transitions between solid/dotted and dimmed/not dimmed are correct
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I choose a different line display in the custom options for a signal with an uncertain region
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then the regions of that signal formerly displayed with a solid line use the custom line option
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    When I click the 'Dimming' option 'Show data outside conditions' again
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    Then dimmed trend data is hidden outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |
    And the uncertain regions of the signal are still displayed using a dotted as opposed to the selected line style
      | PASS | 0.40.00-v201811141002 | Marius Oancea  |  |
      | PASS | 0.38.02-v201806292342 | Austin Sharp   |  |
      | PASS | 0.38.01-v201806150902 | Megan Twyver   |  |
      | PASS | 0.38.00-v201804032145 | Nikhila Albert |  |
      | PASS | 0.36.01-v201801241828 | Stefanie Moses |  |

  Scenario: Adjusting Conditions in the Details Panel
    When I click "Capsule" to switch to Capsule Time
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then I see the capsules from the profile search on the trend
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I click the icon to edit the Profile Search
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And I change the similarity and hit "Execute"
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the trend is updated accordingly
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I add a new Value Search and hit "Execute"
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the Capsules Panel is updated
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And the chart reloads to reflect the changes
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I select the checkbox next to the Profile Search
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the Capsules Panel is updated to only show capsules from that condition
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And the chart redraws to reflect those changes
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I unselect the checkbox next to the Profile Search
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the Capsules Panel is updated with the capsules from both the Profile Search and the Value Search
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And the chart redraws to reflect those changes
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    When I delete the Value Search from the details panel
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    Then the Capsules Panel is updated
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |
    And the chart reloads to only show capsules from the Profile Search
      | PASS | 0.40.00-v201811141002 | Marius Oancea |  |

  Scenario: Limiting the number of capsule series for performance
    When I add at 4 signals to the trend and zoom out so that there are 30 capsules in the capsules table
      | PASS | 0.40.00-v201811261003 | Marius Oancea |  |
    Then I see a notice that the number of capsule time segments is being limited to maintain performance
      | PASS | 0.40.00-v201811261003 | Marius Oancea |  |
    And performance is still decent, as measured by moving the mouse across the trend or selecting a capsule
      | PASS | 0.40.00-v201811261003 | Marius Oancea |  |
    When I try some of the suggestions given by the warning to limit the number shown
      | PASS | 0.40.00-v201811261003 | Marius Oancea |  |
    Then eventually the warning notice disappears
      | PASS | 0.40.00-v201811261003 | Marius Oancea |  |
