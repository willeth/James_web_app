// SPDX-License-Identifier: GPL-3.0
//"d","e","23049","0x4dA783055a24145F64C210e9F0e46AA37A1a7934",["maths","10"]
pragma solidity >=0.7.0 <0.9.0;


contract Results {

    address private owner;

    struct results{
        string firstName;
        string secondName;
        string DOB;
        address add;
        result[] gradesList;
    }
   
    struct result{
        string subject;
        string grade;
    }

    mapping(address => bool) admins;

    mapping (address => results) allResults;

    mapping (address => address[]) authentications;


    constructor() {
        owner = msg.sender; 
        admins[owner] = true;
    }

    function addAdmin(address _add) public {

        
        require(admins[_add] = false, "already an admin");

        admins[_add] = true;

    }

    function getResult (address _add) public view returns (string memory, string memory, string memory, string[] memory) {

        string memory firstName = allResults[_add].firstName;
        string memory secondName = allResults[_add].secondName;
        string memory DOB = allResults[_add].DOB;
        uint lengthRequired = 2*allResults[_add].gradesList.length;
        string[] memory tempresults = new string[](lengthRequired);
        uint j = 0;
        bool hasPermission = false;
        
         for(uint i=0; i < authentications[_add].length; i++){
                
                if(authentications[_add][i] == _add){
                    hasPermission = true;
                    break;
                }

                else if(i == authentications[msg.sender].length-1){
                    hasPermission = false;
                }
        }

        require(hasPermission = true, "You do not have permission");
        
        
        for(uint i=0; i<2*allResults[_add].gradesList.length; i++){


            if(i%2 == 0){
                tempresults[i] = allResults[_add].gradesList[j].subject;
            }

            else{
               tempresults[i] = allResults[_add].gradesList[j].grade;
               j++;
            }

        }


        return (firstName, secondName, DOB, tempresults);

    }


    function setResult (string memory _firstName, string memory _secondName, string memory _DOB, address _add, string[] memory _gradesList) public  {


        require(admins[msg.sender] = true, "you are not an admin");

        allResults[_add].firstName = _firstName;
        allResults[_add].secondName = _secondName;
        allResults[_add].DOB = _DOB;
        result memory tempResult;
        
        for(uint i=0; i<_gradesList.length; i++){

            if(i%2 == 0){
                tempResult.subject = _gradesList[i];
            }

            else{
                tempResult.grade = _gradesList[i];
                allResults[_add].gradesList.push(tempResult);
            }

        }
        
    }

    function authentication (address _add, bool _authOrRevoke) public {

        //uint addressPosition;

        if(_authOrRevoke == true) {
            authentications[msg.sender].push(_add);
        }

        else {
            
            for(uint i=0; i < authentications[msg.sender].length; i++){
                
                if(authentications[msg.sender][i] == _add){
                    //addressPosition = i;
                    authentications[msg.sender][i] = address(0);
                    break;
                }

                else if(i == authentications[msg.sender].length-1){
                    revert("address not in list");
                }
            }

        }


    }






}