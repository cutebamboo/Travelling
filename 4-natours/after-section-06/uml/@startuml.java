@startuml
package mypack {
start
:Create Training Plan;
:Deliver Introduction;
while (Module Completed?) is (no)
  :Deliver Module;
  if (Assessment Passed?) then (yes)
    :Proceed to Next Module;
  else (no)
    :Revisit Module;
  endif
endwhile (yes)
:Final Assessment;
if (Assessment Passed?) then (yes)
  :Complete Onboarding;
else (no)
  :Revisit Modules;
endif
stop
}

package a {
    object b
    
}
@enduml