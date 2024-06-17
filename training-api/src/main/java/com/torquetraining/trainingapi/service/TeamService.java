package com.torquetraining.trainingapi.service;

import com.torquetraining.trainingapi.model.Team;
import com.torquetraining.trainingapi.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(UUID id) {
        return teamRepository.findById(id);
    }

    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    public void deleteTeam(UUID id) {
        teamRepository.deleteById(id);
    }

    //method to update a team
    public Team updateTeam(UUID id, Team updatedTeam) {
        Team currentTeam = teamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found with ID: " + id));
        currentTeam.setName(updatedTeam.getName());
        currentTeam.setDescription(updatedTeam.getDescription());
        currentTeam.setLastDeploymentDate(updatedTeam.getLastDeploymentDate());
        currentTeam.setVersion(updatedTeam.getVersion());
        return teamRepository.save(currentTeam);
    }
}
