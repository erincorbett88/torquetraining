package com.torquetraining.trainingapi.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;


    @Column(name = "last_updated")
    private Date lastDeploymentDate;

    @Column(name = "version")
    private String version;

    // Constructors
    public Team() {
    }

    public Team(String name, String description, Date lastDeploymentDate, String version) {
        this.name = name;
        this.description = description;
        this.lastDeploymentDate = lastDeploymentDate;
        this.version = version;

    }

    // Getters and setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getLastDeploymentDate() {
        return lastDeploymentDate;
    }

    public void setLastDeploymentDate(Date lastDeploymentDate) {
        this.lastDeploymentDate = lastDeploymentDate;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}