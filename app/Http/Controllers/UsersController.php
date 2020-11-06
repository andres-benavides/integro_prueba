<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\User;

class UsersController extends Controller
{
 
    public function index()
    {
        //
    }


    public function create(Request $r){

       
        $data = json_decode($r->getContent(), true);

        if(!empty($data['name']) && !empty($data['nickname']) && !empty($data['password'])){
            try{
           
                $user = new User();
                $data['password'] = bcrypt($data['password']);
                foreach ($data as $column => $value) {
                    $user->$column = $value;
                }

                return $user->save() ? response()->json(['success' => "Usuario creado con exito"]) : ['error' => "Error al crear el usuario"];
            }catch (\Illuminate\Database\QueryException $e) {
                $error = $e->errorInfo;
                return ($error[0] == "23000") ? ["error" =>  "Ya esta registrado ese nickname"] : ["error" => $error[2]];
            }
        }else{
            return response()->json(array('error' => "Todos los campos son obligatorios"));
        }
        
    }

   
    public function all(Request $request){
        return User::all();
    }

  
    public function show($id){
        $user = User::find($id);
        return $user;
    }

   


   
    public function update(Request $r){
        $data=json_decode($r->getContent(), true);
        if(!empty($data['name']) && !empty($data['nickname']) && !empty($data['password'])){
           
            try{
                $user = User::find($data['id']);
                unset($data['id']);
                $data['password'] = bcrypt($data['password']);
                foreach ($data as $column => $value) {
                    $user->$column = $value;
                }
    
                return $user->update() ? ['success' => "Usuario editado con exito"] : ['error' => "Error al editar el usuario"];
            }catch (\Illuminate\Database\QueryException $e) {
                $error = $e->errorInfo;
                return ($error[0] == "23000") ? ["error" =>  "Ya esta registrado ese nickname"] : ["error" => $error[2]];
            }
                
        }else{
            return response()->json(array('error' => "El titulo es obligatorio para la pelicula"));
        }
    }

  
    public function delete($id){
        return  User::destroy($id) ? response()->json(['success' => "Usuario eliminado con exito"]) : ['error' => "Error al eliminar el usuario"];
    }
}
