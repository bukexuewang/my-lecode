#pragma once

#ifndef SHADER_H
#define SHADER_H

#include <glad/glad.h> // ����glad����ȡ���еı���OpenGLͷ�ļ�
#include <glm/mat4x4.hpp>

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

enum SHARDER_TYPE { VERTEX, FRAGMENT };

class Shader {
public:
    std::string getVertexCode();
    Shader* const setVertexCode(const GLchar* path);
    Shader* const setVertexCode(const std::string &source);

    std::string getFragmentCode();
    Shader* const setFragmentCode(const GLchar* path);
    Shader* const setFragmentCode(const std::string &source);

    // ������ɫ��
    bool compile();
    // ʹ��/�������
    Shader* const use();
    // uniform���ߺ���
    Shader* const setUniform(const std::string &name, bool value);
    Shader* const setUniform(const std::string &name, int value);
    Shader* const setUniform(const std::string &name, float value);
    Shader* const setUniform(const std::string& name, float x, float y);
    Shader* const setUniform(const std::string& name, float x, float y, float z);
    Shader* const setUniform(const std::string& name, glm::mat4& transform);

private:
    // ����ID
    GLuint ID = 0;
    std::string vertexCode = "";
    std::string fragmentCode = "";

    GLuint compileShader(GLenum type, const char* source);
    void loadCode(const GLchar* path, SHARDER_TYPE type);
};

#endif