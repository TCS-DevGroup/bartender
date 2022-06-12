#include <ezButton.h>

ezButton limitSwitch(A0);  // create ezButton object that attach to pin 7;

void setup() {
  Serial.begin(9600);
  limitSwitch.setDebounceTime(50); // set debounce time to 50 milliseconds
}

void loop() 
{
  bool res = false;
  res = Is_switch_pressed(); 
  Serial.println(res);
}

bool is_swith_pressed()
{
  limitSwitch.loop(); // MUST call the loop() function first
  int switchPressed = false;
  
  if(limitSwitch.isPressed())
    Serial.println("The limit switch: UNTOUCHED -> TOUCHED");

  if(limitSwitch.isReleased())
    Serial.println("The limit switch: TOUCHED -> UNTOUCHED");

  int state = limitSwitch.getState();
  if(state == HIGH)
  {
    switchPressed = false;
    Serial.println("The limit switch: UNTOUCHED");
  }    
  else
  {   
    switchPressed = true;
    Serial.println("The limit switch: TOUCHED");
  }
  return switchPressed;
}
