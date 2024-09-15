package com.example.vehicle_backend.controller;

import com.example.vehicle_backend.dto.UserDTO;
import com.example.vehicle_backend.dto.ResponseDTO;
import com.example.vehicle_backend.service.UserService;
import com.example.vehicle_backend.utill.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResponseDTO responseDTO;

    @PutMapping(value = "/updateUser")
    public ResponseEntity updateUser(@RequestBody UserDTO userDTO){

        try{
            String res = userService.updateUser(userDTO);

            if(res.equals("00")){

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(userDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);


            }else if(res.equals("01")){

                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not A Registered User!");
                responseDTO.setContent(userDTO);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

            }else{

                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error!");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

            }

        }catch (Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);


        }

    }

    @PostMapping(value = "/saveUser")
    public ResponseEntity saveUser(@RequestBody UserDTO userDTO){

        try{
            String res = userService.saveUser(userDTO);

            if(res.equals("00")){

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(userDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);


            }else if(res.equals("06")){

                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("User Already Registered!");
                responseDTO.setContent(userDTO);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

            }else{

                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error!");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

            }

        }catch (Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);


        }

    }

    @GetMapping("/getAllUsers")
    public ResponseEntity getAllUsers(){

        try {
            List<UserDTO> userDTOList = userService.getAllUsers();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("SUCCESS");
            responseDTO.setContent(userDTOList);
            return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);


        }catch (Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return  new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

        }

    }

    @GetMapping("/searchUser/{userID}")
    public ResponseEntity searchUser(@PathVariable int userID){

        UserDTO userDTO = userService.searchUser(userID);

        try {

            if(userDTO != null){

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("SUCCESS");
                responseDTO.setContent(userDTO);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);

            }else{

                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No User Available With This ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

            }

        }catch (Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return  new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

        }


    }

    @DeleteMapping("/deleteUser/{userID}")
    public ResponseEntity deleteUser(@PathVariable int userID){

        String res = userService.deleteUser(userID);

        try {

            if(res.equals("00")){

                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("DELETE SUCCESS");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED);

            }else{

                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No User Available With This ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

            }

        }catch (Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return  new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);

        }

    }

}
