import axios from "axios"
import { apiCharacter, apiEpisode, apiLocation,FilterCharacter} from "../types"

export const Query = {

    character: async (parent:any, args:{id:number})=>{
        return await((await axios.get(`https://rickandmortyapi.com/api/character/${args.id}`)).data)
    },

    characters: async (parent: any, args: {page:number,filter:FilterCharacter}) => {
        let page: number;
        if(!args.page){
          if(!args.filter){
            page = 1;
            return (await (await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)).data)
          }else{
            const nameFilter:String = (!args.filter.name)?"":args.filter.name;
            const statusFilter:String = (!args.filter.status)?"":args.filter.status;
            const genderFilter:String = (!args.filter.gender)?"":args.filter.gender;
            const speciesFilter:String = (!args.filter.species)?"":args.filter.species;
            const typeFilter:String = (!args.filter.type)?"":args.filter.type;
            return (await (await axios.get(`https://rickandmortyapi.com/api/character/?status=${statusFilter}&species=${speciesFilter}&name=${nameFilter}&gender=${genderFilter}&stype=${typeFilter}`)).data)
          }
        }else{
          page = args.page;
          if(!args.filter){      
            return (await (await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)).data)
          }else{
            const nameFilter:String = (!args.filter.name)?"":args.filter.name;
            const statusFilter:String = (!args.filter.status)?"":args.filter.status;
            const genderFilter:String = (!args.filter.gender)?"":args.filter.gender;
            const speciesFilter:String = (!args.filter.species)?"":args.filter.species;
            const typeFilter:String = (!args.filter.type)?"":args.filter.type;
            return (await (await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&status=${statusFilter}&species=${speciesFilter}&name=${nameFilter}&gender=${genderFilter}&stype=${typeFilter}`)).data)
        }
        }
        
    },
    charactersByIds: async (parent:any, args:{ids:number[]})=>{
        const stringids = args.ids.toString()
        return await((await axios.get(`https://rickandmortyapi.com/api/character/${stringids}`)).data)
    },
}

export const Character = {

    episode : (parent: {episode: string[]})=>{
        return parent.episode.map(async (f:string)=>{
            return await(await (axios.get(f))).data
        })
    },

    location: async (parent:{location:{url:string,name:string}}) => {
        if(parent.location.url !== ""){
            return await(await (axios.get(parent.location.url))).data as apiLocation
        }else{
            return parent.location
        }
    },

    origin: async (parent:{origin:{url:string,name:string}}) => {
        if(parent.origin.name !== "unknown"){
            return await(await (axios.get(parent.origin.url))).data as apiLocation
        }else{
            return parent.origin
        }
    } 
}

export const Episode = {

    characters: (parent:{characters:string[]})=>{
        return parent.characters.map(async (f:string)=>{
            return await(await (axios.get(f))).data 
        })
    }

}

export const Location = {

    residents: async (parent:{residents:string[]}) => {
        return parent.residents.map(async (f:string)=>{
            return await(await (axios.get(f))).data as apiCharacter
        })
    }

}
