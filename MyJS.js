window.addEventListener("load" , start , false);

function start()
{
    //displaying current date 
    displaydate();

    var add = document.getElementById("submit");
    add.addEventListener("click",addtask,false);

    var disable = document.getElementById("deadline");
    disable.addEventListener("click",disableDate,false);

    var completed = document.getElementById("done");
    completed.addEventListener("click",completedTask,false);

}

function displaydate()
{
    var current = new Date();
    var year = current.getFullYear();
    var month = current.getMonth()+1;
    var day = current.getDate();
    
    if (day < 10) 
    {
        day = '0' + day;
    }

    if (month < 10)
    {
        month = '0' + month;
    } 
    var today = month+"/"+ day+"/"+year ;
    document.getElementById("Date").innerHTML = "Current date :"+ " "+ today;
    
}

function disableDate()
{
    var Dtoday = new Date();
    var dd = Dtoday.getDate();
    var mm = Dtoday.getMonth()+1; //January is 0!
    var yyyy = Dtoday.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    } 
    if(mm<10)
    {
        mm='0'+mm;
    } 

    Dtoday = yyyy+'-'+mm+'-'+dd;
    //document.getElementById("deadline").setAttribute("min", Dtoday);


}
function addtask()
{   
    //storing and validating task name 
    var Tname = checkName();

    //storing and validating category
    var category = checkCategory();

    //storing and validating priority 
    var priority = checkPriority();

    //storing and validating date
    var Tdate = checkDate();
    

    if( Tname != false && priority != false && Tdate != false && category!= false ) 
    {
      //setting color based on priority
      if( priority == "High")
      {
        var newtask = append(Tname , Tdate);
        $(newtask).css("background-color" ,"#F36767");
        addImg(newtask , img);
      }
      else if( priority == "Medium")
      {
        var newtask = append(Tname , Tdate);
        $(newtask).css("background-color" , "#FC9B46");
        addImg(newtask , img);
      }
      else if( priority == "Low")
      {
        var newtask = append(Tname , Tdate);
        $(newtask).css("background-color" ,"#F9FB60");
        addImg(newtask , img);
      }
    }
}

//storing and validating task name 
function checkName()
{
    let Tname = document.getElementById("name").value;
    if (Tname == "")
    {
       window.alert("Please enter Task name!");
       return false;
    }
    else if(Tname.length <= 5)
    {
       window.alert("Task name must be longer than 5 characters!");
       return false;
    }
    return Tname;
}

//storing and validating category
function checkCategory()
{
    var category = document.getElementById("category");
    var optionSelIndex = category.options[category.selectedIndex].value;
    if (optionSelIndex == 0) {
        window.alert("Please choose Category!");
        return false;
    }
    return true;
}


//storing and validating priority
function checkPriority()
{
    var choice = document.getElementsByName("priority");
    var priority;
    for(var radio of choice)
    {
        if(radio.checked)
        {
        priority = radio.value;
        }
    }
    //validating the radio buttons
    if( priority == null )
    {
        window.alert("Please choose priority!"); 
        return false;
    }
    return priority;
}


//storing and validating date 
function checkDate()
{
   var Tdate = document.getElementById("deadline").value;

    if (Tdate == "")
    {
        window.alert("Please choose date!");
        return false;
    }
    var y = Tdate.substring(0,4);
    var m = Tdate.substring(5,7);
    var d = Tdate.substring(8,10);

    mmddyyyy=m+"/"+d+"/"+y ;
    return mmddyyyy;
}
var img;
function append(Tname , Tdate)
{
    // adding checkboxes to task list
    var checklist = document.createElement("input");
    checklist.type="checkbox";
    checklist.className="checktask"; 

    var newtask = document.createElement("div");
    newtask.setAttribute("class","newtask");
    var pnewtask = document.createElement("p");
    pnewtask.innerHTML = "<p>"+Tname +"</p> <p>" +Tdate +"</p>";
    newtask.appendChild(pnewtask);
    newtask.appendChild(checklist);
    document.getElementById("addedtask").appendChild(newtask);

    img = document.createElement("img"); 
    newtask.appendChild(img);
    img.setAttribute("class" , "img");

    return newtask;
}

function addImg(newtask , img)
{
    var Tdate = document.getElementById("deadline").value;
    var enteredDate = new Date(Tdate);
    var currentDate = new Date();
    
    if(currentDate.getDate() + 2 == enteredDate.getDate() || currentDate.getDate() + 1 == enteredDate.getDate() || 
    currentDate.getDate() == enteredDate.getDate() )
    {
        img.setAttribute( "src" , "yellow.png");

    }
    if(enteredDate.getDate() < currentDate.getDate())
    {
        img.setAttribute( "src" , "red.png");
       
    }
}

function completedTask()
{
    var counter = 0 ;

    $(".newtask").each( function()
    {
        if ($(this).children(".checktask").is(":checked") )
        {
            $(this).addClass("remove");
            counter++;
            
        }
    }
    );
    if(counter == 0)
    {
        window.alert("Please select a task!");
    }

    $(".newtask").each( function()
    {
        if ($(this).hasClass("remove") )
        {
            $(this).appendTo("#DoneList").removeClass(".newtask").addClass("Donetask");
            $(this).css("background-color" , "#A0FB57");
            $(this).children(".img").attr("src" , "green.png");
        }
    }
    );
    $(".checktask:checked").remove();

}

