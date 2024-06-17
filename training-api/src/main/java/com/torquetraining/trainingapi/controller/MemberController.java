package com.torquetraining.trainingapi.controller;


import com.torquetraining.trainingapi.model.Member;
import com.torquetraining.trainingapi.model.Team;
import com.torquetraining.trainingapi.service.MemberService;
import com.torquetraining.trainingapi.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;
    private final TeamService teamService;

    @Autowired
    public MemberController(MemberService memberService, TeamService teamService) {
        this.memberService = memberService;
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers(){
        List<Member> members = memberService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable UUID id) {
        Optional<Member> member = memberService.getMemberById(id);
        return member.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        System.out.println(member.toString());
            member.setId(UUID.randomUUID());
            Member savedMember = memberService.saveMember(member);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    //endpoint: update a Member
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable UUID id, @RequestBody Member member) {
        Member updatedMember = memberService.saveMember(member);
        return ResponseEntity.ok(updatedMember);

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable UUID id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

}
