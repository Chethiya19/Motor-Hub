package com.example.vehicle_backend.service;

import com.example.vehicle_backend.dto.UserDTO;
import com.example.vehicle_backend.entity.User;
import com.example.vehicle_backend.repository.UserRepository;
import com.example.vehicle_backend.utill.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    public String saveUser(UserDTO userDTO){

        if(userRepository.existsById(userDTO.getUserID())){
            return VarList.RSP_DUPLICATED;
        }else{
            userRepository.save(modelMapper.map(userDTO, User.class));
            return VarList.RSP_SUCCESS;
        }

    }

    public String updateUser(UserDTO userDTO){

        if(userRepository.existsById(userDTO.getUserID())){
            userRepository.save(modelMapper.map(userDTO,User.class));
            return VarList.RSP_SUCCESS;
        }else{
            return VarList.RSP_NO_DATA_FOUND;
        }

    }

    public List<UserDTO> getAllUsers(){

        List<User> userList = userRepository.findAll();
        return modelMapper.map(userList,new TypeToken<ArrayList<UserDTO>>(){}.getType());

    }

    public UserDTO searchUser(int UserID){
        if(userRepository.existsById(UserID)){
            User user = userRepository.findById(UserID).orElse(null);
            return modelMapper.map(user,UserDTO.class);
        }else{
            return null;
        }
    }

    public String deleteUser(int UserID){
        if(userRepository.existsById(UserID)){
            userRepository.deleteById(UserID);
            return VarList.RSP_SUCCESS;
        }else{
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

}
