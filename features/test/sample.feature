Feature: Install Seeq software on a Windows machine
  As a user
  I want to install Seeq software on my Windows machine
  so that I can run the software.

  @manual
  Background: 
    Given that I'm using a clean machine
    And I have downloaded the Seeq installer
 
  @manual
  Scenario: Executable Certificate
    When I double-click on the installer executable in Windows Explorer
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
    Then Windows reports that the executable is properly signed
      # Note:
      #   If this is an unsigned pre-release version or the .exe is not properly signed, Windows
      #   SmartScreen Filter will appear with something like "Windows protected your PC". If you
      #   click "More info" and then "Run anyway", "User Account Control" dialog will appear but
      #   Seeq logo will not appear and publisher will not be known.
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
 
  @manual
  Scenario: Installation Wizard
    When I launch the Seeq installer
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
    Then the Seeq splash screen appears
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
    And a License Agreement appears
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
      | FAIL    | 0.14.01.201412011245 | Steve Sliwa    | CRAB-2572  |
      | SKIPPED | 0.14.00.201412010301 | Jon Peterson   |            |
    When I agree to the license
    Then I am shown where Seeq will be installed and what space will be used
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
    When I click "Install"
    Then .NET Framework 4.0 installer appears
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
    Then a progress bar for the main Seeq installation appears
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
    When the installation finishes
    Then I can choose to launch Seeq immediately
      | PASS    | 0.14.02.201412020843 | Mark Derbecker |            |
