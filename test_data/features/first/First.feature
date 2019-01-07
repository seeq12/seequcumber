@manual
Feature: First Feature
  As a user,
  I want to visually compare capsules of signal data
  So that I can spot important differences.

  Background:
    Given that Seeq is running in the browser
    And I have Profile Search results loaded

  Scenario: Basic Capsule Time
    When I click "Capsule" in the toolbar to switch to Capsule Time
      | FAIL | 0.40.00-v201811141000 | Tester One | defect-1 |
      | PASS | 0.38.02-v201806292342 | Tester One |          |
      | PASS | 0.38.01-v201806130941 | Tester One |          |
    Then the "Capsule" element is selected
      | PASS | 0.40.00-v201811141001 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And all capsules are listed in the Capsules Pane, right of the Details Pane
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And all capsules for all series are visible on the chart
      | PASS | 0.40.00-v201811141000 | Tester One |  |
    And all capsules are shown in a lane as determined by their signal in the Trend Viewer
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the Profile Search pattern is identified in the legend with a special icon
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the Worksheet thumbnail updates in a reasonable length of time (~20 seconds)
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Capsule Time Alignments
    Given I have many capsules showing in Capsule Time
      | SKIPPED | 0.40.00-v201811141002 | Tester One |  |
      | PASS    | 0.38.02-v201806292342 | Tester One |  |
      | PASS    | 0.38.01-v201806130941 | Tester One |  |
    When I select the "Start" alignment option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the "Start" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |


  Scenario: Capsule Time hidden Alignments
    Given I have many capsules showing in Capsule Time
      | FAIL | 0.40.00-v201811141002 | Tester One | defect-2 |
      | PASS | 0.38.02-v201806292342 | Tester One |          |
      | PASS | 0.38.01-v201806130941 | Tester One |          |
    And some of the trends have the opposite slope
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I select the "Start" alignment option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the "Start" alignment option shows as the only selected option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And each trace in a given lane originates from the same starting point (visually)
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I select the "End" alignment option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the trends with the opposite slope are hidden from the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I deselect the "End" alignment option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the trends with the opposite slope are redisplayed on the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Capsule Time Dimmed - outside conditions
    Given I have many capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    When I scroll the mouse wheel out on the horizontal axis
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    Then the time range for the trend gets larger
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    And no trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    When I click the 'Dimming' menu in the toolbar
      | PASS | 0.40.00-v201811141002 | Tester One |  |

    And I check the box 'Show data outside conditions'
      | PASS | 0.40.00-v201811141002 | Tester One |  |

    Then dimmed trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    When I uncheck the 'Show data outside conditions' box
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

    Then dimmed trend data is hidden outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |


  Scenario: Capsule Time Dimmed - unselected signals
    Given I have all the capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I select several capsules in the Capsules Panel
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then the unselected signals become dimmed in the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | FAIL | 0.40.00-v201811141001 | Test One   |  |
    When I click the 'Dimming' menu in the toolbar
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    And I check the box 'Show only selected signals'
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then only the selected capsules are displayed in the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I select a new capsule in the Capsules Panel
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then I see it appear in the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I deselect a capsule in the Capsules Panel
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then I see it disappear in the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I increase the display range
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then I still only see the signals that I have selected.
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I uncheck the box 'Show only selected signals'
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then the unselected signals reappear dimmed on the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |

  Scenario: Capsule Time Dimming Menu and Alerts
    Given I have all the capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I click on the "Dimming" menu
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    And I click one or both of the checkboxes
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    And then click outside of the menu
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then the "Dimming" menu becomes depressed
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I unselect both of the checkboxes
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then the "Dimming" menu becomes undepressed
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I click "Show only selected signals"
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    And I have no capsules selected in the capsules panel
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then I see the Capsule View warning message
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    When I click the link part of the message
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    Then all the capsules are loaded in the chart
      | PASS | 0.40.00-v201811141002 | Tester One |  |
    And the "Show only selected signals" checkbox is no longer selected
      | PASS | 0.40.00-v201811141002 | Tester One |  |

  Scenario: Capsule Time displays uncertain signal
    Given I have many capsules showing in Capsule Time
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And at least one of them includes an uncertain region of a signal
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then certain regions of the signal are displayed with a solid line regardless of the certainty of the containing capsule
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And uncertain regions of the signal are displayed with a dotted line regardless of the certainty of the containing capsule
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I scroll the mouse wheel out on the horizontal axis
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the time range for the trend gets larger
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And no trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I click the 'Dimming' option 'Show data outside conditions'
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then dimmed trend data is shown outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the transitions between solid/dotted and dimmed/not dimmed are correct
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I choose a different line display in the custom options for a signal with an uncertain region
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the regions of that signal formerly displayed with a solid line use the custom line option
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I click the 'Dimming' option 'Show data outside conditions' again
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then dimmed trend data is hidden outside of the capsule period associated to the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the uncertain regions of the signal are still displayed using a dotted as opposed to the selected line style
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Adjusting Conditions in the Details Panel
    When I click "Capsule" to switch to Capsule Time
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then I see the capsules from the profile search on the trend
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I click the icon to edit the Profile Search
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And I change the similarity and hit "Execute"
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the trend is updated accordingly
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I add a new Value Search and hit "Execute"
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the Capsules Panel is updated
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the chart reloads to reflect the changes
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I select the checkbox next to the Profile Search
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the Capsules Panel is updated to only show capsules from that condition
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the chart redraws to reflect those changes
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I unselect the checkbox next to the Profile Search
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the Capsules Panel is updated with the capsules from both the Profile Search and the Value Search
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the chart redraws to reflect those changes
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    When I delete the Value Search from the details panel
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    Then the Capsules Panel is updated
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |
    And the chart reloads to only show capsules from the Profile Search
      | PASS | 0.40.00-v201811141002 | Tester One |  |
      | PASS | 0.38.02-v201806292342 | Tester One |  |
      | PASS | 0.38.01-v201806130941 | Tester One |  |

  Scenario: Limiting the number of capsule series for performance
    When I add at 4 signals to the trend and zoom out so that there are 30 capsules in the capsules table
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    Then I see a notice that the number of capsule time segments is being limited to maintain performance
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    And performance is still decent, as measured by moving the mouse across the trend or selecting a capsule
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    When I try some of the suggestions given by the warning to limit the number shown
      | PASS | 0.39.00-v201811141002 | Tester One |  |
    Then eventually the warning notice disappears
      | PASS | 0.39.00-v201811141002 | Tester One |  |