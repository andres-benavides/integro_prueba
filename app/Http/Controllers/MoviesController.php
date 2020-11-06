<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Models\Movies;

class MoviesController extends Controller
{
 
    public function index()
    {
        //
    }


    public function create(Request $r){

       
        $data = json_decode($r->getContent(), true);

        if(!empty($data['titulo'])){
            if(!empty($data['anio'])){
                $movie = new Movies();
                foreach ($data as $column => $value) {
                    $movie->$column = $value;
                }

                return $movie->save() ? response()->json(['success' => "Pelicula creada con exito"]) : ['error' => "Error al crear la pelicula"];
            }else{
                return response()->json(array('error' => "El año es obligatorio para la pelicula"));
            }
        }else{
            return response()->json(array('error' => "El titulo es obligatorio para la pelicula"));
        }
        
    }

   
    public function all(Request $request){
        return Movies::all();
    }

  
    public function show($id){
        $movie = Movies::find($id);
        return $movie;
    }

   


   
    public function update(Request $r){
        $data=json_decode($r->getContent(), true);
        if(!empty($data['titulo'])){
           
            $movie = Movies::find($data['id']);
            unset($data['id']);
            foreach ($data as $column => $value) {
                $movie->$column = $value;
              }
    
            return $movie->update() ? ['success' => "Pelicula editada con exito"] : ['error' => "Error al editar la pelicula"];
                
            }else{
                return response()->json(array('error' => "El titulo es obligatorio para la pelicula"));
            }
    }

  
    public function delete($id){
        return  Movies::destroy($id) ? response()->json(['success' => "Pelicula eliminada con exito"]) : ['error' => "Error al eliminar la pelicula"];
    }
}
