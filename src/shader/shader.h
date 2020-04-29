#pragma once

#ifndef SHADER_H
#define SHADER_H

#include <glad/glad.h> // ����glad����ȡ���еı���OpenGLͷ�ļ�

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

enum SHARDER_TYPE { VERTEX, FRAGMENT };

class Shader {
public:
    std::string getVertexCode();
    void setVertexCode(const GLchar* path);
    void setVertexCode(const std::string &source);

    std::string getFragmentCode();
    void setFragmentCode(const GLchar* path);
    void setFragmentCode(const std::string &source);

    // ������ɫ��
    bool compile();
    // ʹ��/�������
    void use();
    // uniform���ߺ���
    void setUniform(const std::string &name, bool value);
    void setUniform(const std::string &name, int value);
    void setUniform(const std::string &name, float value);

private:
    // ����ID
    GLuint ID = 0;
    std::string vertexCode = "";
    std::string fragmentCode = "";

    GLuint compileShader(GLenum type, const char* source);
    void loadCode(const GLchar* path, SHARDER_TYPE type);
};

#endif