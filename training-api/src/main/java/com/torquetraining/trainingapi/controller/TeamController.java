package com.torquetraining.trainingapi.controller;


import com.torquetraining.trainingapi.model.Team;
import com.torquetraining.trainingapi.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    //endpoint: get all teams
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams(){
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    //endpoint: get a single team by an id
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable UUID id) {
        Optional<Team> team = teamService.getTeamById(id);
        return team.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //endpoint: create a new team
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        team.setId(UUID.randomUUID());
        Team savedTeam = teamService.saveTeam(team);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTeam);
    }

    //endpoint: update a t eam
    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable UUID id, @RequestBody Team team) {
        Team updatedTeam = teamService.saveTeam(team);
        return ResponseEntity.ok(updatedTeam);

    }

    //endpoint: delete a team
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable UUID id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }
}
