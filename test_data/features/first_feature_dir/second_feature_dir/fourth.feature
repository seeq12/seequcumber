@journal
Feature: Journal Entry Access
  As a user
  I want to share journal entries with other users
  So that I can communicate workbook notes with others

  Background:
    Given Seeq is running as an admin user 

  Scenario: Edit journal entry in an Edit/Full Control workbook
    Given a workbook that gives "<access_level>" access to Everyone
    And the workbook has a journal entry
    And that Seeq is running in the browser as a non-admin user
    And the help is closed
    When I edit a journal entry in the workbook
    Then the journal entry should be edited
    And I should not be able to delete the entry
    Examples:
      | access_level |
      | Edit         |
      | Full Control |