import{j as c,k as h}from"./chunk-M22CPC4C.js";import{a,b as o,c as p}from"./chunk-JHHBZ5S2.js";import{$ as s,ea as i}from"./chunk-NNBNMEEF.js";var $=(()=>{class r{constructor(t,e){this.http=t,this.authService=e,this.apiUrl=c.baseUrl}getAuthHeaders(){let t=localStorage.getItem("carcare-token");if(!t)throw new Error("Token manquant");return new a({Authorization:`Bearer ${t}`,"Content-Type":"application/json"})}createAppointment(t){let e=this.getAuthHeaders();return this.http.post(`${this.apiUrl}/appointments`,t,{headers:e})}getAllAppointments(){let t=this.getAuthHeaders();return this.http.get(`${this.apiUrl}/appointments`,{headers:t})}getAppointmentsByClient(){let t=this.authService.currentUserValue;console.log("User ID envoy\xE9:",t?.user_id);let e=this.getAuthHeaders(),n=new o().set("user_id",t?.user_id??"");return this.http.get(`${this.apiUrl}/appointments/client`,{headers:e,params:n})}getAppointmentById(t){let e=this.getAuthHeaders();return this.http.get(`${this.apiUrl}/appointments/${t}`,{headers:e})}updateAppointment(t,e){let n=this.getAuthHeaders();return this.http.put(`${this.apiUrl}/appointments/${t}`,e,{headers:n})}cancelAppointment(t){let e=this.getAuthHeaders();return this.http.put(`${this.apiUrl}/appointments/cancel/${t}`,{},{headers:e})}changingStatusAppointmentByManager(t,e,n,u){let m=this.getAuthHeaders(),l={status:e,message:n,userId:u};return this.http.put(`${this.apiUrl}/appointments/changing-status-manager/${t}`,l,{headers:m})}static{this.\u0275fac=function(e){return new(e||r)(i(p),i(h))}}static{this.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var U=(()=>{class r{getStatusColor(t){switch(t){case"Confirm\xE9":return"primary";case"En cours":return"warning";case"En attente":return"warning";case"Termin\xE9":return"success";case"Annul\xE9":return"error";default:return"default"}}static{this.\u0275fac=function(e){return new(e||r)}}static{this.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{$ as a,U as b};
