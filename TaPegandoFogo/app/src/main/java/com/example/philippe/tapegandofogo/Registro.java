package com.example.philippe.tapegandofogo;

import com.google.android.gms.maps.model.LatLng;
import com.google.maps.android.clustering.ClusterItem;

public class Registro implements ClusterItem {

    private long Timestamp;

    private String description;

    private String type;

    private String origin;

    private String image;

    private String thumb;

    private double latitude;

    private double longitude;

    private boolean sync;


    private int upvotes;

    private int downvotes;


    public long getTimestamp() {
        return Timestamp;
    }

    public void setTimestamp(long timestamp) {
        Timestamp = timestamp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getThumb() {
        return thumb;
    }

    public void setThumb(String thumb) {
        this.thumb = thumb;
    }

    public boolean isSync() {
        return sync;
    }

    public void setSync(boolean sync) {
        this.sync = sync;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }


    public int getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }

    public int getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(int downvotes) {
        this.downvotes = downvotes;
    }


    public Feed toFeed() {
        Feed f = new Feed();
        f.setDescription(this.getDescription());
        f.setThumb(this.getThumb());
        f.setType("fire");
        GPSLocation g = new GPSLocation();
        g.setType("Point");
        g.setCoordinates(new double[]{this.getLongitude(),this.getLatitude()});
        f.setLocation(g);
        return f;
    }

    @Override
    public LatLng getPosition() {
        return new LatLng(this.latitude,this.longitude);
    }

    @Override
    public String getTitle() {
        return this.description;
    }

    @Override
    public String getSnippet() {
        return this.description;
    }
}
