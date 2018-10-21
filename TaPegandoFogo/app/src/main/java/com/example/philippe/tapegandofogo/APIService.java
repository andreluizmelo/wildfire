package com.example.philippe.tapegandofogo;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import cz.msebera.android.httpclient.HttpEntity;
import cz.msebera.android.httpclient.client.methods.CloseableHttpResponse;
import cz.msebera.android.httpclient.client.methods.HttpGet;
import cz.msebera.android.httpclient.client.methods.HttpPost;
import cz.msebera.android.httpclient.entity.ContentType;
import cz.msebera.android.httpclient.entity.StringEntity;
import cz.msebera.android.httpclient.impl.client.CloseableHttpClient;
import cz.msebera.android.httpclient.impl.client.HttpClientBuilder;
import cz.msebera.android.httpclient.util.EntityUtils;

public class APIService {

    public List<Registro> GetAllAlerts(double latitude, double longitude){
        Feed[] feeds = this.FindByLatLong(latitude,longitude);
        List<Registro> regs = new ArrayList<Registro>();
        for(Feed f : feeds) {
            Registro r = new Registro();
            r.setOrigin(f.getOrigin());
            r.setThumb(f.getThumb());
            r.setDescription(f.getDescription());
            r.setType(f.getType());
            r.setLatitude(f.getLocation().getCoordinates()[0]);
            r.setLongitude(f.getLocation().getCoordinates()[1]);
            regs.add(r);
        }
        return regs;
    }


    public void Publish(Registro registro) {
        try (CloseableHttpClient client = HttpClientBuilder.create().build()) {
            Gson gson = new GsonBuilder().create();
            HttpPost httpPost = new HttpPost("https://snasa.herokuapp.com/incident");
            httpPost.setEntity(new StringEntity(gson.toJson(registro.toFeed()), ContentType.APPLICATION_JSON));
            CloseableHttpResponse response = client.execute(httpPost);
            try {

                System.out.println(response.getStatusLine());
                HttpEntity entity = response.getEntity();
                EntityUtils.consume(entity);
            }
            finally {
                response.close();
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }


    public Feed[] FindByLatLong(double latitude, double longitude) {
        try (CloseableHttpClient client = HttpClientBuilder.create().build()) {
            Gson gson = new GsonBuilder().create();
            HttpGet httpPost = new HttpGet("https://snasa.herokuapp.com/incidents?latitude="+latitude+"&longitude="+longitude);

            CloseableHttpResponse response = client.execute(httpPost);
            try {

                System.out.println(response.getStatusLine());
                HttpEntity entity = response.getEntity();
                InputStreamReader reader = new InputStreamReader(entity.getContent());
                Feed[] feeds = gson.fromJson(reader,Feed[].class);
                return feeds;
            }
            finally {
                response.close();
            }
        } catch (IOException e) {
            System.out.println(e);
        }

        return null;
    }
}
