export class GPSHelper {

    private latitude :number;
    private longitude :number;

    public getPosition() {
        function parse_query_string(query) {
            if (query == undefined || query == null)  {
              //return { "latitude": "7.33439", "longitude": "3.8998"}
               return { "latitude": "-22.978705", "longitude": "-43.2318758"}
            }
            var vars = query.split("&");
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split("=");
              var key = decodeURIComponent(pair[0]);
              var value = decodeURIComponent(pair[1]);
              // If first entry with this name
              if (typeof query_string[key] === "undefined") {
                query_string[key] = decodeURIComponent(value);
                // If second entry with this name
              } else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], decodeURIComponent(value)];
                query_string[key] = arr;
                // If third or later entry with this name
              } else {
                query_string[key].push(decodeURIComponent(value));
              }
            }
            return query_string;
        }
        return new Promise((resolve,reject)=>{
            var q = window.location.href.split("?")[1];
            resolve(parse_query_string(q));
        });

    }
}
