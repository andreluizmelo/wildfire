package com.example.philippe.tapegandofogo;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.SearchView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;

    private Location location;
    private boolean granted = true;
    private ImageView flameButton;
    private ImageView smokeButton;
    private Registro current;
    private List<Marker> markers = new ArrayList<Marker>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);


        if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && checkSelfPermission(Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED) {
            granted = false;
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.INTERNET},
                    200);

            return;
        }

        LocationManager locationManager = (LocationManager)
                getSystemService(Context.LOCATION_SERVICE);
        List<String> providers = locationManager.getAllProviders();
        location = locationManager.getLastKnownLocation(providers.get(2));

        current = new Registro();

        current.setLatitude(location.getLatitude());
        current.setLongitude(location.getLongitude());

        flameButton = (ImageView)findViewById(R.id.flameButton);
        final MapsActivity self = this;
        flameButton.setOnClickListener(new View.OnClickListener(){

            public void onClick(View view) {
                Intent receivedIntent = getIntent();
                String receivedAction = receivedIntent.getAction();
                if(receivedAction.equals(Intent.ACTION_SEND)){

                    String receivedType = receivedIntent.getType();

                    Uri receivedUri = (Uri)receivedIntent.getParcelableExtra(Intent.EXTRA_STREAM);

                    Bitmap icon = null;
                    try {
                        icon = MediaStore.Images.Media.getBitmap(self.getContentResolver(), receivedUri);
                        Matrix matrix = new Matrix();
                        int base = 96;
                        int width = (int)1.2 * base;
                        Bitmap scaledBitmap = Bitmap.createScaledBitmap(icon, width, base, false);
                        current.setType("fire");
                        current.setDescription("fire reported");
                        //current.setImage(ImageUtil.convert(icon));
                        current.setThumb(ImageUtil.convert(scaledBitmap));
                        new APIService().Publish(current);
                        current = new Registro();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }});



    }


    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case 200: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    granted = true;
                    renderMarkers();

                } else {
                    granted = false;
                }
                return;
            }
            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

    private Bitmap addWhiteBorder(Bitmap bmp, int borderSize) {
        Bitmap bmpWithBorder = Bitmap.createBitmap(bmp.getWidth() + borderSize * 2, bmp.getHeight() + borderSize * 2, bmp.getConfig());
        Canvas canvas = new Canvas(bmpWithBorder);
        canvas.drawColor(Color.WHITE);
        canvas.drawBitmap(bmp, borderSize, borderSize, null);
        return bmpWithBorder;
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        if (granted) {
            renderMarkers();
        }

    }

    public void renderMarkers(){
        // Add a marker in Sydney and move the camera

        LatLng sydney = new LatLng(this.location.getLatitude(), this.location.getLongitude());

        mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(location.getLatitude(), location.getLongitude()), 11.0f));
        Intent receivedIntent = getIntent();
        String receivedAction = receivedIntent.getAction();
        if(receivedAction.equals(Intent.ACTION_SEND)){

            String receivedType = receivedIntent.getType();

            Uri receivedUri = (Uri)receivedIntent.getParcelableExtra(Intent.EXTRA_STREAM);

            Bitmap icon = null;
            try {
                icon = MediaStore.Images.Media.getBitmap(this.getContentResolver(), receivedUri);
                Matrix matrix = new Matrix();

                matrix.postRotate(90);
                int base = 96;
                int width = (int)1.2 * base;
                Bitmap scaledBitmap = Bitmap.createScaledBitmap(icon, width, base, false);
                current.setType("fire");
                current.setDescription("fire reported");
                MarkerOptions mkOpt = new MarkerOptions().position(sydney).title(current.getDescription()).icon(BitmapDescriptorFactory.fromBitmap(addWhiteBorder(scaledBitmap,6)));
                this.markers.add(mMap.addMarker(mkOpt));

            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        List<Registro> l = new APIService().GetAllAlerts();
        for (Registro reg : l){
            Bitmap bmp = ImageUtil.convert(reg.getThumb());
            MarkerOptions mkOpt2 = new MarkerOptions().position(new LatLng(reg.getLatitude(), reg.getLongitude())).title(reg.getDescription()).icon(BitmapDescriptorFactory.fromBitmap(addWhiteBorder(bmp,6)));
            MarkerOptions mkDefault = new MarkerOptions().position(new LatLng(reg.getLatitude(), reg.getLongitude())).title(reg.getDescription());
            if (reg.getOrigin() != "user") {
                this.markers.add(mMap.addMarker(mkDefault));
            }else{
                this.markers.add(mMap.addMarker(mkOpt2));
            }

        }
    }

}
